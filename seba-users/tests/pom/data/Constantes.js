import dotenv from 'dotenv'

dotenv.config()

export const URLS = {
	FORM_LOGIN : process.env.WP_BASE_URL
}

export const CREDENTIALS = {
	WP_ADMIN_USER : process.env.WP_ADMIN_USER,
	WP_ADMIN_PASSSWORD : process.env.WP_ADMIN_PASSSWORD
}
