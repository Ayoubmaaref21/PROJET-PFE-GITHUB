import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../Repositories/routes/routes'
import pullRequestesRoutes from '../../PullRequestes/routes/routes'

const routes = [...sharedRoutes, ...authRoutes,...repoRoutes,...pullRequestesRoutes,]

export default routes
