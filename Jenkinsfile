pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vehiclechecker'
        DOCKER_HUB_REGISTRY = 'docker.io/thestrangerr13/masterofnone'
        DIGITALOCEAN_REGISTRY = 'registry.digitalocean.com/thestranger13'
        DOCKER_TOKEN = credentials('dockerhub_token')
    }

    stages {
        stage('Log Environment Variables') {
            steps {
                script {
                    echo "Docker Hub Registry: ${DOCKER_HUB_REGISTRY}"
                    echo "DigitalOcean Registry: ${DIGITALOCEAN_REGISTRY}"
                }
            }
        }
        // Prepare DigitalOcean credentials
        stage('Prepare Credentials') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DigitalOcean', usernameVariable: 'DOCKER_USERNAME_DO', passwordVariable: 'DOCKER_TOKEN_DO')]) {
                        echo 'DigitalOcean credentials loaded'
                    }
                }
            }
        }

        // Build Stage with Docker
        stage('Build') {
            steps {
                script {
                    echo 'Building the Docker image and tagging it as the latest'
                    sh 'docker build -t ${IMAGE_NAME}:latest .'
                    echo 'Pushing the Docker image to Docker Hub'
                    sh 'docker push ${DOCKER_HUB_REGISTRY}:latest'
                }
            }
        }

        // Code Quality Analysis Stage using ESLint
        stage('Code Quality Analysis Stage') {
            steps {
                script {
                    echo 'Installing the necessary dependencies of the project'
                    sh 'npm install' 
                    echo 'Running ESLint to analyse the code'
                    sh 'npm run lint' 
                }
            }
        }

        // Test Web Application using Mocha
        stage('Test Stage') {
            steps {
                script {
                    echo 'Testing the application with Mocha'
                    sh 'npm test' 
                }
            }
        }

        // Deploy stage to Docker Container
        stage('Deploy Stage') {
            steps {
                script {
                    echo 'Stop and remove any existing container'
                    sh 'docker stop vcContainer || true'
                    sh 'docker rm vcContainer || true'

                    echo 'Running new container called vcContainer mapped to port 3000'
                    sh 'docker run -d --name vcContainer -p 3000:3000 ${IMAGE_NAME}:latest'
                }
            }
        }

        // Release stage for DigitalOcean App Platform
        stage('Release Stage') {
            steps {
                script {
                    echo 'Logging in to DigitalOcean Container Registry'
                    sh "echo '${DOCKER_TOKEN_DO}' | docker login ${DIGITALOCEAN_REGISTRY} -u ${DOCKER_USERNAME_DO} --password-stdin"

                    echo 'Tagging the Docker image for DigitalOcean'
                    sh "docker tag ${IMAGE_NAME}:latest ${DIGITALOCEAN_REGISTRY}/${IMAGE_NAME}:latest"

                    echo 'Pushing the Docker image to DigitalOcean'
                    sh "docker push ${DIGITALOCEAN_REGISTRY}/${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            echo 'This will always run after the pipeline'
        }
        success {
            echo 'The pipeline has completed successfully!'
        }
        failure {
            echo 'The pipeline failed ): try again!'
        }
    }
}
