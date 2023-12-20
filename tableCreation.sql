


CREATE TABLE LearningPackage (
    learningPackageId INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    targetAudience VARCHAR(255) NOT NULL,
    difficultyLevel INT NOT NULL
);

CREATE TABLE LearningFact (
    learningFactId INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    learningPackageId INT NOT NULL,
    FOREIGN KEY (learningPackageId) REFERENCES LearningPackage(learningPackageId)
);
