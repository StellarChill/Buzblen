-- CreateTable
CREATE TABLE "EmployeeDetails" (
    "EmployeeID" UUID NOT NULL,
    "UserName" VARCHAR(50) NOT NULL,
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
CREATE TABLE "NotificationDetails" (
    "NotificationID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "NotificationType" TEXT NOT NULL,
    "PostID" UUID NOT NULL,
    "DateNotified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NotificationDetails_pkey" PRIMARY KEY ("NotificationID")
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "SearchID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "SearchQuery" TEXT NOT NULL,
    "SearchDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("SearchID")
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

-- CreateTable
CREATE TABLE "FeedbackDetails" (
    "FeedbackID" UUID NOT NULL,
    "EmployeeID" UUID NOT NULL,
    "DevID" UUID NOT NULL,
    "FeedbackText" TEXT NOT NULL,
    "DateSubmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DevResponse" TEXT,

    CONSTRAINT "FeedbackDetails_pkey" PRIMARY KEY ("FeedbackID")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeDetails_UserName_key" ON "EmployeeDetails"("UserName");

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
ALTER TABLE "NotificationDetails" ADD CONSTRAINT "NotificationDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationDetails" ADD CONSTRAINT "NotificationDetails_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "PostDetails"("PostID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevDetails" ADD CONSTRAINT "DevDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackDetails" ADD CONSTRAINT "FeedbackDetails_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "EmployeeDetails"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;
