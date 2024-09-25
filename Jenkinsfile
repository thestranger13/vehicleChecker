pipeline {
    agent any

    stages {
        stage('Test Docker') {
            steps {
                script {
                    sh '/usr/local/bin/docker --version'
                    sh '/usr/local/bin/docker ps'
                }
            }
        }
    }
}