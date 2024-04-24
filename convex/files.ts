import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity?.tokenIdentifier);
    console.log(identity?.name);
  if (!identity) {
    console.log('identity not found');
    return null;
  }

    await ctx.db.insert('files', {
      name: args.name,
      orgId: args.orgId,
    });
  }
});

export const getFileByOrg = query({
  args: {
    orgId: v.string()
  },
  async handler(ctx, args) {
    // const identity = await ctx.auth.getUserIdentity();
    // if(!identity) { return []; }
    return ctx.db
    .query('files')
    .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
    .collect();
  }
})
export const getFile = query({
  args: {},
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) { return []; }

    return ctx.db.query('files').collect();
  }
})