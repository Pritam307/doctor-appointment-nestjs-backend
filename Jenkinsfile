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

        stage('Docker Build & Push') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG ."
                    // Optional: push to Docker Hub / private registry
                    // sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                    // sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove old container if exists
                    sh """
                        docker rm -f nestjs-container || true
                        docker run -d --name nestjs-container -p 3000:3000 $DOCKER_IMAGE:$DOCKER_TAG
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
