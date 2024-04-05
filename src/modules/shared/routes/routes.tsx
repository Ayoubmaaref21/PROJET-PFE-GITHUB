import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../Repositories/routes/routes'
import pullRequestesRoutes from '../../PullRequestes/routes/routes'
import commitFilesChanged from '../../CommitChangedFiles/routes/index'

const routes = [...sharedRoutes, ...authRoutes,...repoRoutes,...pullRequestesRoutes,...commitFilesChanged]

export default routes
