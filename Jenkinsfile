pipeline {
    agent any

    // Set the environment with default / global names
    environment {
        IMAGE_NAME = 'vehiclechecker'
    }

    stages {
        // Fetching the latest code from Git
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        // Build Stage with Docker
        stage('Build') {
            steps {
                script {
                    echo 'Building the Docker image...'
                    // Build Docker Image i.e. vehiclechecker:latest
                    sh 'docker build -t ${IMAGE_NAME}:latest .'
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
