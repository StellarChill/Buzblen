

-- Create Table Employee
CREATE TABLE Employee (
    EmployeeID SERIAL PRIMARY KEY,
    EmployeeType INT NOT NULL,
    UserName VARCHAR(50) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Age INT NOT NULL,
    Gender CHAR(1) NOT NULL,
    PhoneNumber VARCHAR(10) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL,
    UserStatus VARCHAR(50) NOT NULL
);

-- Create Table Post
CREATE TABLE Post (
    PostID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    PostDescription TEXT NOT NULL,
    PostStatus VARCHAR(50) NOT NULL,
    DateCreated DATE NOT NULL,
    ImageURL TEXT NOT NULL,
    IsDeleted VARCHAR(1) NOT NULL CHECK (IsDeleted IN ('Y', 'N')),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

-- Create Table Comment
CREATE TABLE Comment (
    CommentID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    PostID INT NOT NULL,
    CommentText TEXT NOT NULL,
    DateCommented DATE NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (PostID) REFERENCES Post(PostID)
);

-- Create Table Like
CREATE TABLE "Like" (
    LikeID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    PostID INT NOT NULL,
    DateLiked DATE NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (PostID) REFERENCES Post(PostID)
);

-- Create Table Notification
CREATE TABLE Notification (
    NotificationID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    NotificationType INT NOT NULL,
    PostID INT,
    DateNotified DATE NOT NULL,
    IsRead VARCHAR(1) NOT NULL CHECK (IsRead IN ('Y', 'N')),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (PostID) REFERENCES Post(PostID)
);

-- Create Table SearchHistory
CREATE TABLE SearchHistory (
    SearchID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    SearchQuery TEXT NOT NULL,
    SearchDateTime TIMESTAMP NOT NULL,
    IsDeleted VARCHAR(1) NOT NULL CHECK (IsDeleted IN ('Y', 'N')),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

-- Create Table Feedback
CREATE TABLE Feedback (
    FeedbackID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    DevID INT NOT NULL,
    FeedbackText TEXT NOT NULL,
    DateSubmitted DATE NOT NULL,
    DevResponse TEXT NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

-- Create Table DevDetails
CREATE TABLE DevDetails (
    DevID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    DateOfBlock DATE NOT NULL,
    ReasonOfBlock TEXT NOT NULL,
    DateOfDelete DATE NOT NULL,
    ReasonOfDelete TEXT NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);
