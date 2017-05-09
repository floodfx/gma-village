import { combineReducers } from 'redux';
import * as AccountKitInitReducer from './AccountKitInit';
import * as AdminListReducer from './AdminList';
import * as AdminProfileReducer from './AdminProfile';
import * as AuthReducer from './Auth';
import * as GmaProfileReducer from './GmaProfile';
import * as GmasListReducer from './GmasList';
import * as ParentListReducer from './ParentList';
import * as ParentProfileReducer from './ParentProfile';
import * as SaveAdminReducer from './SaveAdmin';
import * as SaveCareNeedReducer from './SaveCareNeed';
import * as SaveGmaReducer from './SaveGma';
import * as SaveParentReducer from './SaveParent';
import * as UploadImageReducer from './UploadImage';

import { reducer as form } from 'redux-form';

export default combineReducers(Object.assign({},
  {form},
  AccountKitInitReducer,
  AdminListReducer,
  AdminProfileReducer,
  AuthReducer,
  GmaProfileReducer,
  GmasListReducer,
  ParentListReducer,
  ParentProfileReducer,
  SaveAdminReducer,
  SaveCareNeedReducer,
  SaveGmaReducer,
  SaveParentReducer,
  UploadImageReducer
))
