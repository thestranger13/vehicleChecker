pipeline {
    agent any

    // Set the environment with global names
    environment {
        IMAGE_NAME = 'vehiclechecker'
    }

         // Build Stage with Docker
        stage('Build') {
            steps {
                script {
                    echo 'Building the Docker image and tagging it as the latest'
                    sh 'docker build -t ${IMAGE_NAME}:latest .'
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

        // Deployment stage to Docker Container
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
