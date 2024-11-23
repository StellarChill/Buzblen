-- CreateTable
CREATE TABLE "EmployeeDetails" (
    "EmployeeID" UUID NOT NULL,
    "Email" VARCHAR(100) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,

    CONSTRAINT "EmployeeDetails_pkey" PRIMARY KEY ("EmployeeID")
);

-- CreateTable
CREATE TABLE "PostDetails" (
    "PostID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "PostDescription" TEXT NOT NULL,
    "PostStatus" TEXT NOT NULL,
    "DateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ImageURL" TEXT NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostDetails_pkey" PRIMARY KEY ("PostID")
);

-- CreateTable
CREATE TABLE "CommentDetails" (
    "CommentID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "PostID" UUID NOT NULL,
    "CommentText" TEXT NOT NULL,
    "DateCommented" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentDetails_pkey" PRIMARY KEY ("CommentID")
);

-- CreateTable
CREATE TABLE "LikeDetails" (
    "LikeID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "PostID" UUID NOT NULL,
    "DateLiked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikeDetails_pkey" PRIMARY KEY ("LikeID")
);

-- CreateTable
CREATE TABLE "DevDetails" (
    "DevID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "DateOfBlock" TIMESTAMP(3) NOT NULL,
    "ReasonOfBlock" TEXT NOT NULL,
    "DateOfDelete" TIMESTAMP(3),
    "ReasonOfDelete" TEXT,

    CONSTRAINT "DevDetails_pkey" PRIMARY KEY ("DevID")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeDetails_Email_key" ON "EmployeeDetails"("Email");

-- AddForeignKey
ALTER TABLE "PostDetails" ADD CONSTRAINT "PostDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDetails" ADD CONSTRAINT "CommentDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDetails" ADD CONSTRAINT "CommentDetails_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "PostDetails"("PostID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeDetails" ADD CONSTRAINT "LikeDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeDetails" ADD CONSTRAINT "LikeDetails_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "PostDetails"("PostID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevDetails" ADD CONSTRAINT "DevDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;
