package com.gmavillage.database.importer;

import static com.google.auth.oauth2.GoogleCredentials.fromStream;

import java.io.FileInputStream;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Child;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Neighborhood;
import com.gmavillage.model.Neighborhoods;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.EntityValue;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StringValue;
import com.google.common.collect.Sets;

public class ImportFromDatastore {

  private static final String CITY = "city";
  private static final String NEIGHBORHOOD = "neighborhood";
  private static final String AVAILABILITIES = "availabilities";
  private static final String MEMBER_SINCE_TIMESTAMP = "member_since_timestamp";
  private static final String LAST_LOGIN_TIMESTAMP = "last_login_timestamp";
  private static final String ID = "id";
  private static final String ROLES = "roles";
  private static final String CREATED_ON_TIMESTAMP = "created_on_timestamp";
  private static final String AK_TOKEN_REFRESH_INTERVAL_SEC = "ak_token_refresh_interval_sec";
  private static final String CHILDREN = "kids";
  private static final String WHY_CARE_FOR_KIDS_TEXT = "whyCareForKidsText";
  private static final String OTHER_NEIGHBORHOOD = "otherNeighborhood";
  private static final String OTHER_DEMEANOR = "otherDemeanor";
  private static final String OTHER_CARE_EXPERIENCE = "otherCareExperience";
  private static final String OTHER_AVAILABILITY = "otherAvailability";
  private static final String DEMEANORS = "demeanors";
  private static final String OTHER_CARE_TRAINING = "otherCareTraining";
  private static final String CARE_TRAININGS = "careTrainings";
  private static final String CARE_LOCATIONS = "careLocations";
  private static final String CARE_EXPERIENCES = "careExperiences";
  private static final String CARE_AGES = "careAges";
  private static final String IS_AVAILABLE_OUTSIDE_NEIGHBORHOOD = "isAvailableOutsideNeighborhood";
  private static final String AVAILBILITIES = "availbilities";
  private static final String ADDITIONAL_INFORMATION_TEXT = "additionalInformationText";
  private static final String KIND = "kind";
  private static final String PROFILE_PHOTO_URL = "profilePhotoUrl";
  private static final String PHONE = "phone";
  private static final String LAST_NAME = "last_name";
  private static final String FIRST_NAME = "first_name";
  private static final String ACTIVE = "active";
  private static final String AK_USER_ID = "ak_user_id";
  private static final String AK_ACCESS_TOKEN = "ak_access_token";


  private static final String PROJECT_ID = "gma-village";
  private static final String CREDS_FILE =
      "/Users/donnie/.gcloud/credentials/GmaVillage-d4898565aa3f.json";

  private static final String KIND_CARE_NEED = "CareNeed";
  private static final String KIND_USER = "User";

  public static void main(final String... args) throws Exception {
    // Instantiates a client
    final DatastoreOptions options = DatastoreOptions.newBuilder() //
        .setProjectId(PROJECT_ID) //
        .setCredentials(fromStream(new FileInputStream(CREDS_FILE))) //
        .setNamespace("prod") //
        .build();

    final Datastore datastore = options.getService();
    new ImportFromDatastore().processUsers(datastore);


  }

  void processUsers(final Datastore datastore) throws Exception {
    final Query<Entity> userQuery = Query.newEntityQueryBuilder().setKind(KIND_USER).build();
    final QueryResults<Entity> retrieved = datastore.run(userQuery);
    int admins = 0;
    int gmas = 0;
    int parents = 0;
    int others = 0;
    final UserDB userDB = new UserDB();
    while (retrieved.hasNext()) {
      final Entity e = retrieved.next();
      try {
        switch (e.getString(KIND)) {
          case "Gma":
            final Gma g = gmaFromEntity(e);
            System.out.println("Gma" + ToStringBuilder.reflectionToString(g));
            gmas++;
            userDB.createGma(g);
            break;
          case "Parent":
            final Parent p = parentFromEntity(e);
            System.out.println("Parent" + ToStringBuilder.reflectionToString(p));
            parents++;
            userDB.createParent(p);
            break;
          case "Admin":
            final Admin a = adminFromEntity(e);
            System.out.println("Admin" + ToStringBuilder.reflectionToString(a));
            admins++;
            userDB.createAdmin(a);
            break;
          default:
            others++;
        }
      } catch (final Exception ex) {
        ex.printStackTrace();
      }
    }
    System.out.println("Admins:" + admins);
    System.out.println("Parents:" + parents);
    System.out.println("Gmas:" + gmas);
    System.out.println("others:" + others);

  }

  User mapEntityToUser(final Entity e) {
    System.out.println("Processing user:" + e);
    final User u = new User();
    for (final String name : e.getNames()) {
      switch (name) {
        case AK_ACCESS_TOKEN:
          u.setAccountKitAccessToken(e.getString(AK_ACCESS_TOKEN));
          break;
        case AK_USER_ID:
          u.setAccountKitUserId(e.getString(AK_USER_ID));
          break;
        case AK_TOKEN_REFRESH_INTERVAL_SEC:
          // TODO
          // u.setAccountKitAccessTokenExpiresAt(accountKitAccessTokenExpiresAt);
          break;
        case ACTIVE:
          u.setActive(e.getBoolean(ACTIVE));
          break;
        case FIRST_NAME:
          u.setFirstName(e.getString(FIRST_NAME));
          break;
        case LAST_NAME:
          u.setLastName(e.getString(LAST_NAME));
          break;
        case PHONE:
          u.setPhone(e.getString(PHONE));
          break;
        case PROFILE_PHOTO_URL:
          u.setProfileImageUrl(e.getString(PROFILE_PHOTO_URL));
          break;
        case KIND:
          u.setUserType(e.getString(KIND).toUpperCase());
          break;
        case CREATED_ON_TIMESTAMP:
          u.setCreatedOn(java.time.LocalDateTime.ofEpochSecond(e.getLong(CREATED_ON_TIMESTAMP), 0,
              ZoneOffset.UTC));
          break;
        case ADDITIONAL_INFORMATION_TEXT:
        case AVAILBILITIES:
        case AVAILABILITIES:
        case IS_AVAILABLE_OUTSIDE_NEIGHBORHOOD:
        case CARE_AGES:
        case CARE_EXPERIENCES:
        case CARE_LOCATIONS:
        case CARE_TRAININGS:
        case DEMEANORS:
        case OTHER_DEMEANOR:
        case OTHER_CARE_EXPERIENCE:
        case OTHER_CARE_TRAINING:
        case OTHER_AVAILABILITY:
        case OTHER_NEIGHBORHOOD:
        case WHY_CARE_FOR_KIDS_TEXT:
        case CHILDREN:
        case NEIGHBORHOOD:
        case CITY: // ignoring
        case ROLES: // ignoring
        case ID: // ignoring
        case LAST_LOGIN_TIMESTAMP:// ignoring
        case MEMBER_SINCE_TIMESTAMP:// ignoring
          // loaded by other readers so ignoring
          break;
        default:
          System.out.println("SKIPPING Named:" + name);
      }
    }

    return u;
  }

  List<String> toStringList(final Entity e, final String listProp) {
    final List<StringValue> stringValues = e.getList(listProp);
    return stringValues.stream().map(s -> s.get()).collect(Collectors.toList());
  }

  Admin adminFromEntity(final Entity e) {
    System.out.println("\n\nStarting");
    System.out.println("names" + e.getNames());
    final Admin a = new Admin(mapEntityToUser(e));
    System.out.println("Processing Admin" + e);
    for (final String name : e.getNames()) {
      switch (name) {
        case AK_ACCESS_TOKEN:
        case AK_TOKEN_REFRESH_INTERVAL_SEC:
        case AK_USER_ID:
        case ACTIVE:
        case FIRST_NAME:
        case LAST_NAME:
        case PHONE:
        case PROFILE_PHOTO_URL:
        case KIND:
        case CREATED_ON_TIMESTAMP:
        case CITY: // ignoring
        case ROLES: // ignoring...
        case ID: // ignoring
        case LAST_LOGIN_TIMESTAMP:// ignoring
        case MEMBER_SINCE_TIMESTAMP:// ignoring
          // loaded by mapToUser so ignoring
          break;
        default:
          System.out.println("SKIPPING Named:" + name);
      }
    }

    return a;
  }

  Parent parentFromEntity(final Entity e) {
    System.out.println("\n\nStarting");
    System.out.println("names" + e.getNames());
    final Parent p = new Parent(mapEntityToUser(e));
    System.out.println("Processing Parent" + e);
    for (final String name : e.getNames()) {
      switch (name) {
        case CHILDREN:
          final List<EntityValue> childrenValues = e.getList(CHILDREN);
          final Set<Child> children = Sets.newHashSet();
          for (final EntityValue ev : childrenValues) {
            final FullEntity f = ev.get();
            final Child c = new Child();
            final LocalDate dob = Instant.ofEpochSecond(f.getLong("birthday"))
                .atZone(ZoneId.systemDefault()).toLocalDate();
            c.setDob(dob);
            c.setFirstName(f.getString(FIRST_NAME));
            children.add(c);
          }
          p.setChildren(children);
          break;
        case NEIGHBORHOOD:
          Neighborhood n = Neighborhoods.byLabel(e.getString(NEIGHBORHOOD));
          if (n.equals(Neighborhoods.UNKNOWN_OAKLAND)) {
            if ("OTHER".equals(e.getString(NEIGHBORHOOD))) {
              n = Neighborhoods.OTHER_OAKLAND;
            } else {
              System.out.println(
                  "\n\n\n\n\n\n\nFound UNKNOWN:" + n + " for name:" + e.getString(NEIGHBORHOOD));
            }
          }
          p.setNeighborhood(n);
          break;
        case OTHER_NEIGHBORHOOD:
          p.setOtherNeighborhood(e.getString(OTHER_NEIGHBORHOOD));
          break;
        case AK_ACCESS_TOKEN:
        case AK_TOKEN_REFRESH_INTERVAL_SEC:
        case AK_USER_ID:
        case ACTIVE:
        case FIRST_NAME:
        case LAST_NAME:
        case PHONE:
        case PROFILE_PHOTO_URL:
        case KIND:
        case CREATED_ON_TIMESTAMP:
        case CITY: // ignoring
        case ID: // ignoring
        case LAST_LOGIN_TIMESTAMP:// ignoring
        case MEMBER_SINCE_TIMESTAMP:// ignoring
          // loaded by mapToUser so ignoring
          break;
        default:
          System.out.println("SKIPPING Named:" + name);
      }
    }

    return p;
  }

  Gma gmaFromEntity(final Entity e) {
    System.out.println("\n\nStarting");
    System.out.println("names" + e.getNames());
    final Gma g = new Gma(mapEntityToUser(e));
    System.out.println("Processing gma" + e);
    for (final String name : e.getNames()) {
      switch (name) {
        case ADDITIONAL_INFORMATION_TEXT:
          g.setAdditionalInfo(e.getString(ADDITIONAL_INFORMATION_TEXT));
          break;
        case AVAILBILITIES:
        case AVAILABILITIES:
          g.setAvailabilitiesStrings(toStringList(e, name));
          break;
        case IS_AVAILABLE_OUTSIDE_NEIGHBORHOOD:
          g.setAvailableOutsideNeighborhood(e.getBoolean(IS_AVAILABLE_OUTSIDE_NEIGHBORHOOD));
          break;
        case CARE_AGES:
          g.setCareAgesStrings(toStringList(e, CARE_AGES));
          break;
        case CARE_EXPERIENCES:
          g.setCareExperiencesStrings(toStringList(e, CARE_EXPERIENCES));
          break;
        case CARE_LOCATIONS:
          g.setCareLocationsStrings(toStringList(e, CARE_LOCATIONS));
          break;
        case CARE_TRAININGS:
          g.setCareTrainings(toStringList(e, CARE_TRAININGS));
          break;
        case OTHER_CARE_TRAINING:
          // add other care training to list since care trainings are now just strings
          g.getCareTrainings().add(e.getString(OTHER_CARE_TRAINING));
          break;
        case DEMEANORS:
          g.setDemeanorsStrings(toStringList(e, DEMEANORS));
          break;
        case OTHER_DEMEANOR:
          g.setOtherDemeanor(e.getString(OTHER_DEMEANOR));
          break;
        case OTHER_CARE_EXPERIENCE:
          g.setOtherCareExperience(e.getString(OTHER_CARE_EXPERIENCE));
          break;
        case OTHER_AVAILABILITY:
          g.setOtherAvailability(e.getString(OTHER_AVAILABILITY));
          break;
        case OTHER_NEIGHBORHOOD:
          g.setOtherNeighborhood(e.getString(OTHER_NEIGHBORHOOD));
          break;
        case WHY_CARE_FOR_KIDS_TEXT:
          g.setWhyCareForKids(e.getString(WHY_CARE_FOR_KIDS_TEXT));
          break;
        case NEIGHBORHOOD:
          Neighborhood n = Neighborhoods.byLabel(e.getString(NEIGHBORHOOD));
          if (n.equals(Neighborhoods.UNKNOWN_OAKLAND)) {
            if ("OTHER".equals(e.getString(NEIGHBORHOOD))) {
              n = Neighborhoods.OTHER_OAKLAND;
            } else {
              System.out.println(
                  "\n\n\n\n\n\n\nFound UNKNOWN:" + n + " for name:" + e.getString(NEIGHBORHOOD));
            }
          }
          g.setNeighborhood(n);
          break;
        case AK_ACCESS_TOKEN:
        case AK_TOKEN_REFRESH_INTERVAL_SEC:
        case AK_USER_ID:
        case ACTIVE:
        case FIRST_NAME:
        case LAST_NAME:
        case PHONE:
        case PROFILE_PHOTO_URL:
        case KIND:
        case CREATED_ON_TIMESTAMP:
        case CITY: // ignoring
        case ID: // ignoring
        case LAST_LOGIN_TIMESTAMP:// ignoring
        case MEMBER_SINCE_TIMESTAMP:// ignoring
          // loaded by mapToUser so ignoring
          break;
        default:
          System.out.println("SKIPPING Named:" + name);
      }
    }

    return g;
  }
}
