import { g, auth, config } from '@grafbase/sdk'
// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const thread = g.model('Post', {
  // title: g.string(),
  // slug: g.string().unique().,
  text : g.string().optional(),
  createdAt: g.datetime().optional(),
  // comments: g.relation(() => comment).optional().list().optional(),
  likes: g.int().default(0),
  tags: g.string().optional().list().length({ max: 5 }),
  author: g.relation(() => user).optional(),
  community: g.relation(() => community).optional(), 
  parentId: g.string(),
  children: g.relation(() => thread).list().optional()
}).search()


const community = g.model('Community', {
  id: g.string(),
  username: g.string().length({ min: 3 }),
  name: g.string().length({ min: 3 }),
  image: g.url().optional(),
  bio: g.string().optional(),
  members: g.relation(() => user).list().optional(),
  createdBy: g.relation(() => user),
  thraeds: g.relation(() => thread).list().optional()

})

const user = g.model('User', {
  id: g.string(),
  name: g.string().length({ min: 3 }),
  username: g.string().length({ min: 3}),
  image: g.url().optional(),
  email: g.email().optional(),
  bio: g.string().optional(),
  onboarded: g.boolean().default(false),
  threads: g.relation(thread).optional().list(),
  communities: g.relation(community).optional().list(),
  follows: g.relation(() => user).optional().list(),
  mentions: g.relation(() => user).optional().list(),

  // comments: g.relation(comment).optional().list()

  // Extend models with resolvers
  // https://grafbase.com/docs/edge-gateway/resolvers
  // gravatar: g.url().resolver('user/gravatar')
})

// const authProvider = auth.Authorizer({}: Authorizer)

export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
