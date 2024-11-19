-- CreateTable
CREATE TABLE "EmployeeDetails" (
    "EmployeeID" UUID NOT NULL,
    "EmployeeType" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "DateOfBirth" TIMESTAMP(3) NOT NULL,
    "Age" INTEGER NOT NULL,
    "Gender" TEXT NOT NULL,
    "PhoneNumber" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "UserStatus" TEXT NOT NULL,

    CONSTRAINT "EmployeeDetails_pkey" PRIMARY KEY ("EmployeeID")
);

-- CreateTable
CREATE TABLE "PostDetails" (
    "PostID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "PostDescription" TEXT NOT NULL,
    "PostStatus" TEXT NOT NULL,
    "DateCreated" TIMESTAMP(3) NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "IsDeleted" TEXT NOT NULL,

    CONSTRAINT "PostDetails_pkey" PRIMARY KEY ("PostID")
);

-- CreateTable
CREATE TABLE "CommentDetails" (
    "CommentID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "PostID" UUID NOT NULL,
    "CommentText" TEXT NOT NULL,
    "DataCommented" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentDetails_pkey" PRIMARY KEY ("CommentID")
);

-- CreateTable
CREATE TABLE "DevDetails" (
    "DevID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "DateOfBlock" TIMESTAMP(3) NOT NULL,
    "ReasonOfBlock" TEXT NOT NULL,
    "DateOfDelete" TIMESTAMP(3) NOT NULL,
    "ReasonOfDelete" TEXT NOT NULL,

    CONSTRAINT "DevDetails_pkey" PRIMARY KEY ("DevID")
);

-- CreateTable
CREATE TABLE "LikeDetails" (
    "LikeID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "PostID" UUID NOT NULL,
    "DateLiked" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikeDetails_pkey" PRIMARY KEY ("LikeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeDetails_EmployeeType_key" ON "EmployeeDetails"("EmployeeType");

-- AddForeignKey
ALTER TABLE "PostDetails" ADD CONSTRAINT "PostDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDetails" ADD CONSTRAINT "CommentDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDetails" ADD CONSTRAINT "CommentDetails_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "PostDetails"("PostID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevDetails" ADD CONSTRAINT "DevDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeDetails" ADD CONSTRAINT "LikeDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeDetails" ADD CONSTRAINT "LikeDetails_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "PostDetails"("PostID") ON DELETE RESTRICT ON UPDATE CASCADE;
