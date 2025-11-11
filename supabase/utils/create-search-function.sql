create
or replace function match_users_embeddings(
      embedding vector(768),
      match_threshold float
    )
    returns setof users_embeddings
    language plpgsql
  as $$
    #variable_conflict use_variable
begin
return query
select *
from users_embeddings
where users_embeddings.embedding <#> embedding < -match_threshold
order by users_embeddings.embedding <#> embedding;
end;
$$;