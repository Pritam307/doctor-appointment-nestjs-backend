pipeline {
    // agent {
    //     docker {
    //         image 'node:18-alpine' // Use Node.js 18 Alpine image
    //         args '-u root:root' // so npm can install without permission issues
    //     }
    // }

    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }


    tools {
        nodejs "NODEJS-18.20"  // name you configured in Jenkins tools
    }
    environment {
        DOCKER_IMAGE = "doctor-appointment-app"     // change to your app name
        DOCKER_TAG = "latest"              // could also use GIT_COMMIT for versioning
        DATABASE_URL = credentials('DATABASE_URL')
        JWT_SECRET   = credentials('JWT_SECRET')
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Pritam307/doctor-appointment-nestjs-backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install -g @nestjs/cli'
                sh 'rm -rf node_modules package-lock.json'
                sh 'npm install --unsafe-perm=true --no-audit --no-fund'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
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
