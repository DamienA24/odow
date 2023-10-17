-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `userId`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BodyParts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partName` VARCHAR(255) NOT NULL,
    `isGeneralCategory` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DifficultyLevels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `levelName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExerciseBodyParts` (
    `exerciseId` INTEGER NOT NULL,
    `bodyPartId` INTEGER NOT NULL,

    INDEX `exercisebodyparts_ibfk_2`(`bodyPartId`),
    PRIMARY KEY (`exerciseId`, `bodyPartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `difficultyLevelId` INTEGER NULL,
    `urlVideo` VARCHAR(255) NULL,

    INDEX `difficultyLevelId`(`difficultyLevelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Metrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metricName` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoundExercises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roundId` INTEGER NOT NULL,
    `exerciseId` INTEGER NOT NULL,
    `reps` INTEGER NOT NULL,
    `rest` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,

    INDEX `exerciseId`(`exerciseId`),
    INDEX `roundId`(`roundId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rounds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `rest` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMetrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `metricId` INTEGER NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `date` DATE NOT NULL,

    INDEX `metricId`(`metricId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWorkoutProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userWorkoutSessionId` INTEGER NOT NULL,
    `roundId` INTEGER NOT NULL,
    `exerciseId` INTEGER NOT NULL,
    `startedAt` DATETIME(0) NOT NULL,
    `completedAt` DATETIME(0) NULL,

    INDEX `exerciseId`(`exerciseId`),
    INDEX `roundId`(`roundId`),
    INDEX `userWorkoutSessionId`(`userWorkoutSessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWorkoutSessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `workoutId` INTEGER NOT NULL,
    `startDate` DATETIME(0) NOT NULL,
    `endDate` DATETIME(0) NULL,

    INDEX `userId`(`userId`),
    INDEX `workoutId`(`workoutId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkoutRounds` (
    `workoutId` INTEGER NOT NULL,
    `roundId` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `roundId`(`roundId`),
    INDEX `workoutId`(`workoutId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workouts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `durationInMinutes` INTEGER NOT NULL,
    `description` TEXT NULL,
    `bodyPartId` INTEGER NULL,
    `type` ENUM('simple', 'complexe') NOT NULL DEFAULT 'simple',
    `date` DATE NULL,

    INDEX `bodyPartId`(`bodyPartId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseBodyParts` ADD CONSTRAINT `exercisebodyparts_ibfk_1` FOREIGN KEY (`exerciseId`) REFERENCES `Exercises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ExerciseBodyParts` ADD CONSTRAINT `exercisebodyparts_ibfk_2` FOREIGN KEY (`bodyPartId`) REFERENCES `BodyParts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Exercises` ADD CONSTRAINT `exercises_ibfk_2` FOREIGN KEY (`difficultyLevelId`) REFERENCES `DifficultyLevels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RoundExercises` ADD CONSTRAINT `roundexercises_ibfk_1` FOREIGN KEY (`roundId`) REFERENCES `Rounds`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RoundExercises` ADD CONSTRAINT `roundexercises_ibfk_2` FOREIGN KEY (`exerciseId`) REFERENCES `Exercises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMetrics` ADD CONSTRAINT `usermetrics_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserMetrics` ADD CONSTRAINT `usermetrics_ibfk_2` FOREIGN KEY (`metricId`) REFERENCES `Metrics`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserWorkoutProgress` ADD CONSTRAINT `userworkoutprogress_ibfk_1` FOREIGN KEY (`userWorkoutSessionId`) REFERENCES `UserWorkoutSessions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserWorkoutProgress` ADD CONSTRAINT `userworkoutprogress_ibfk_2` FOREIGN KEY (`roundId`) REFERENCES `Rounds`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserWorkoutProgress` ADD CONSTRAINT `userworkoutprogress_ibfk_3` FOREIGN KEY (`exerciseId`) REFERENCES `Exercises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserWorkoutSessions` ADD CONSTRAINT `userworkoutsessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserWorkoutSessions` ADD CONSTRAINT `userworkoutsessions_ibfk_2` FOREIGN KEY (`workoutId`) REFERENCES `Workouts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkoutRounds` ADD CONSTRAINT `workoutrounds_ibfk_1` FOREIGN KEY (`workoutId`) REFERENCES `Workouts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WorkoutRounds` ADD CONSTRAINT `workoutrounds_ibfk_2` FOREIGN KEY (`roundId`) REFERENCES `Rounds`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Workouts` ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`bodyPartId`) REFERENCES `BodyParts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
