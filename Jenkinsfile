pipeline {
    agent any

    // Set the environment with global names
    environment {
        IMAGE_NAME = 'vehiclechecker'
        DOCKER_HUB_REGISTRY = 'docker.io/thestrangerr13/masterofnone'
        DIGITALOCEAN_REGISTRY = 'registry.digitalocean.com/thestrangerr13'
        DOCKER_USERNAME = 'thestrangerr13' 
        DOCKER_TOKEN = credentials('dockerhub_token') 
    }

    stages {
        // Define the DigitalOcean credentials in a script block
        stage('Prepare Credentials') {
            steps {
                script {
                    // Retrieve DigitalOcean credentials
                    DOCKER_USERNAME_DO = credentials('digitalocean_token').username
                    DOCKER_TOKEN_DO = credentials('digitalocean_token').password
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
                    sh "docker tag ${DOCKER_HUB_REGISTRY}:latest ${DIGITALOCEAN_REGISTRY}/${IMAGE_NAME}:latest"

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