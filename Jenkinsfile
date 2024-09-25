pipeline {
    agent any

    // Set the environment 
    environment {
        IMAGE_NAME = 'vehiclechecker'
        DOCKER_HUB_REPO = 'thestrangerrr13/masterofnone'
    }

    stages {
        // Build Stage with Docker and Push to DockerHub
        stage('Build') {
            steps {
                script {
                    echo 'Checking shell environment...'
                    sh 'echo $SHELL'
                    sh 'which sh'
                    echo 'Building the Docker image...'
                    sh 'docker build -t ${IMAGE_NAME} .'
                    // Login to DockerHub
                    withCredentials([usernamePassword(credentialsId: 'DockerHub_Cred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        // Tag the Docker image
                        sh 'docker tag ${IMAGE_NAME} ${DOCKER_HUB_REPO}:latest'
                        // Push the Docker image to Docker Hub
                        sh 'docker push ${DOCKER_HUB_REPO}:latest'
                    }
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
