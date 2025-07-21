# 1. Build üçün openjdk image istifadə edirik
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Maven Wrapper scriptlərini və pom.xml faylını kopyala
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Lazımlı asılılıqları yüklə (cache üçün)
# mvnw faylına icra icazəsi verilməlidir
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Kodu kopyala
COPY src ./src

# Layihəni build et (jar faylını yarat)
RUN ./mvnw package -DskipTests

# İkinci mərhələ - run üçün
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Build mərhələsindən jar faylını gətir
COPY --from=build /app/target/personal-website-0.0.1-SNAPSHOT.jar app.jar

# Tətbiqi işə sal
ENTRYPOINT ["java","-jar","app.jar"]