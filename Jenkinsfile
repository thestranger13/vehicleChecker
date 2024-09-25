pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vehiclechecker'
        DIGITALOCEAN_REGISTRY = 'registry.digitalocean.com/thestranger13'
        DROPLET_ID = 'docker-s-1vcpu-1gb-syd1-01'              
    }

    stages {
        // Log Environment Variables
        stage('Log Environment Variables') {
            steps {
                script {
                    echo "DigitalOcean Registry: ${DIGITALOCEAN_REGISTRY}"
                }
            }
        }

        // Build Stage with Docker
        stage('Build Stage') {
            steps {
                script {
                    echo 'Building the Docker image and tagging it as the latest'
                    sh 'docker build -t ${IMAGE_NAME}:latest .'

                    echo 'Tagging the Docker image for DigitalOcean'
                    sh "docker tag ${IMAGE_NAME}:latest ${DIGITALOCEAN_REGISTRY}/${IMAGE_NAME}:latest"
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
                    sh 'docker run -d --name vcContainer -p 3000:3000 ${DIGITALOCEAN_REGISTRY}/${IMAGE_NAME}:latest'
                }
            }
        }
    }


post {
        always {
            echo 'This will always run after the pipeline'
        }
        success {
            script {
                echo 'The pipeline has completed successfully!'
                // Send an email notification on success
                mail to: 'S223646635',
                     subject: "Pipeline Succeeded: ${currentBuild.fullDisplayName}",
                     body: """
                        Guess what! The pipeline has completed successfully (:
                        Check the build here: ${env.BUILD_URL}

                        Thank you!
                     """
            }
        }
        failure {
            script {
                echo 'The pipeline failed ): try again!'
                // Send an email notification on failure
                mail to: 'S223646635',
                     subject: "Pipeline Failed: ${currentBuild.fullDisplayName}",
                     body: """
                        Uh-oh! The pipeline failed ):
                        Check the build here: ${env.BUILD_URL}

                     """
            }
        }
    }
}