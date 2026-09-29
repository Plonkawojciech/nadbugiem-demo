import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pl } from '@payloadcms/translations/languages/pl'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Team } from './collections/Team'
import { Partners } from './collections/Partners'
import { Inquiries } from './collections/Inquiries'
import { Settings } from './globals/Settings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const hosts = ['https://fundacjanadbugiem.programo.pl', 'http://localhost:3015']

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Fundacja Nad Bugiem' },
    components: { graphics: { Logo: '@/components/admin/Logo', Icon: '@/components/admin/Icon' } },
  },
  i18n: { supportedLanguages: { pl }, fallbackLanguage: 'pl' },
  collections: [Posts, Projects, Team, Partners, Inquiries, Media, Users],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./payload.db' },
    migrationDir: path.resolve(dirname, 'migrations'),
    push: false,
  }),
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  cors: hosts,
  csrf: hosts,
})
