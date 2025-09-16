pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "doctor-appointment-app"   
        DOCKER_TAG = "latest"              // could also use GIT_COMMIT for versioning
        DATABASE_URL = credentials('DATABASE_URL')
        JWT_SECRET   = credentials('JWT_SECRET')
        JWT_EXPIRES_IN   = credentials('JWT_EXPIRES_IN')
    }

    stages {
    
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Pritam307/doctor-appointment-nestjs-backend.git'
            }
        }

        stage('Install Dependencies & buid & test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root:root'
                }
            }
            steps {
                sh 'npm install -g @nestjs/cli'
                sh 'rm -rf node_modules package-lock.json'
                sh 'npm install'
                sh 'npm run build'
                sh 'npm run test'
            }
        }

        stage('Docker build & Deploy') {
            steps {
                script {
                    sh """
                        docker compose -f docker-compose.yml down || true
                        docker compose -f docker-compose.yml build
                        export JWT_SECRET=$JWT_SECRET
                        export DATABSAE_URL=$DATABASE_URL
                        export JWT_EXPIRES_IN=$JWT_EXPIRES_IN
                        docker compose -f docker-compose.yml up -d
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
