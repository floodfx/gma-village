with insertcn as
  (insert into careneedschildren
    (
      careneed_id, child_id
    )
    values
    (
      :careneed_id, :child_id
    )
    returning *
  )
select 
  careneed_id, child_id
from insertcn
