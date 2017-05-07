with insertc as
  (insert into children
    (
      id, parent_id, first_name, dob, note
    )
    values
    (
      default, :parent_id, :first_name, :dob, :note
    )
    returning *
  )
select 
  id, parent_id, first_name, dob, note
from insertc
