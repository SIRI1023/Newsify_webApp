-- supabase/migrations/20240101_create_track_article_interaction.sql
CREATE OR REPLACE FUNCTION track_article_interaction(
  p_user_id UUID,
  p_article_title TEXT,
  p_article_category TEXT,
  p_article_url TEXT,
  p_read_at TIMESTAMPTZ
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert into reading_history
  INSERT INTO reading_history (
    user_id,
    article_title,
    article_category,
    article_url,
    read_at,
    time_spent
  ) VALUES (
    p_user_id,
    p_article_title,
    p_article_category,
    p_article_url,
    p_read_at,
    0
  );

  -- Insert into recommendations with initial score
  INSERT INTO recommendations (
    user_id,
    article_title,
    article_category,
    article_url,
    score,
    created_at
  ) VALUES (
    p_user_id,
    p_article_title,
    p_article_category,
    p_article_url,
    50, -- Default initial score
    p_read_at
  )
  ON CONFLICT (user_id, article_url) 
  DO UPDATE SET
    score = recommendations.score + 10,
    created_at = p_read_at;

  -- Update user preferences
  UPDATE users
  SET preferences = jsonb_set(
    COALESCE(preferences, '{}'::jsonb),
    '{categories}',
    COALESCE(
      jsonb_set(
        COALESCE(preferences->'categories', '{}'::jsonb),
        array[p_article_category],
        COALESCE((preferences->'categories'->p_article_category)::int::text, '0')::int + 1
      ),
      '{}'::jsonb
    )
  )
  WHERE id = p_user_id;
END;
$$;
