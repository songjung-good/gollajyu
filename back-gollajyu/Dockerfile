#FROM openjdk:17
#ARG JAR_FILE=build/libs/*.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]

# Use the official OpenJDK 17 image as the base image
FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper files to the working directory
COPY gradle/ gradle/
COPY gradlew ./

# Copy the build.gradle and settings.gradle files to the working directory
COPY build.gradle settings.gradle ./

# Copy the source code into the container
COPY src/ src/

# Build the application with Gradle
RUN chmod +x ./gradlew

# Expose port 8080 for the Spring Boot application
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "build/libs/backgollajyu.jar"]