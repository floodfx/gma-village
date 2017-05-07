with insertcn as
  (insert into careneedsgmas
    (
      careneed_id, gma_id
    )
    values
    (
      :careneed_id, :gma_id
    )
    returning *
  )
select 
  careneed_id, gma_id
from insertcn
