-- Create admin user account
-- First, let's insert a user directly for admin purposes
-- Insert admin role for a test user (we'll create the user via signup)
-- Admin credentials: admin@cyberdata.com / Admin123!

-- We'll create a way to identify admin users easily
-- Create a function to make any user an admin (for setup purposes)
CREATE OR REPLACE FUNCTION public.make_user_admin(_email TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID;
BEGIN
  -- Get user ID from auth.users table
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = _email;
  
  IF _user_id IS NOT NULL THEN
    -- Insert admin role if not exists
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;