CREATE TABLE "public"."user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    avatar VARCHAR(255) NOT NULL DEFAULT 'default-avatar.png',
    "resetToken" VARCHAR(255),
    "expiresIn" BIGINT
);

CREATE TABLE "public"."group" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE "public"."chatMessages" (
    id SERIAL PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "destinataryId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "public"."user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("destinataryId") REFERENCES "public"."user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "public"."groupMessages" (
    id SERIAL PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "public"."user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("groupId") REFERENCES "public"."group"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "public"."userToGroup" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "public"."user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("groupId") REFERENCES "public"."group"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "public"."userToUser" (
    "userId" INTEGER NOT NULL REFERENCES "public"."user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "userId2" INTEGER NOT NULL REFERENCES "public"."user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "userToGroupIndex" ON "public"."userToGroup"("userId" int4_ops, "groupId" int4_ops);
CREATE UNIQUE INDEX "userToUserIndex" ON "public"."userToUser"("userId" int4_ops, "userId2" int4_ops);