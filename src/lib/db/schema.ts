import {integer, text, boolean, pgTable, serial, varchar, index, pgEnum, timestamp, jsonb} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";



export const rolesEnum = pgEnum("roles",["user","customer","admin"])


export const todo = pgTable("todo", {
    id: integer("id").primaryKey(),
    text: text("text").notNull(),
    done: boolean("done").default(false).notNull(),
});


export const users=pgTable('users',{
    id:serial('id').primaryKey(),
    firstname:varchar('firstname',{length:100}).notNull(),
    lastname:varchar('lastname',{length:100}).notNull(),
    email:varchar('email',{length:100}).unique().notNull(),
    age:integer('age').notNull(),
    role:rolesEnum().default("user"),
        updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
        createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)

},


    //    fast retrieving data using indexing
    (table)=>{
      return {
          nameIdx:index("name_idx").on(table.firstname),
          emailIdx:index("email_idx").on(table.email)
      }
    }


    // The CHECK constraint is used to limit the value range that can be placed in a column.
    // (table)=>[{
    //   checkConstraint :check("age_check",sql`${table.age}>21`)
    // }]

)
// user having a profile information stored in separate table. In this case, because the foreign key is stored in the “profile_info” table, the user relation have neither fields or references. This tells Typescript that user.profileInfo is nullable:
export const usersRelations=relations(users,({one})=>({
    profileInfo:one(profileInfo)
}))



export const profileInfo= pgTable('profle_info',{
    id:serial('id').primaryKey(),
    userId:integer('user_id').references(()=>users.id),
    image:text('image'),
    metadata:jsonb('metadata')

})
export const profileInfoRelations = relations(profileInfo,({one})=>({
    user:one(users,{fields:[profileInfo.id],references:[users.id]}),
}))

export const book = pgTable('book',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    authorId:integer('author_id').references(()=>users.id)
})