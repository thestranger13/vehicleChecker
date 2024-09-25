pipeline {
    agent any

    stages {
        stage('Test Docker') {
            steps {
                script {
                    echo 'Checking Docker permissions...'
                    sh 'whoami'
                    sh 'groups'
                    sh 'docker --version'
                    sh 'docker ps'
                }
            }
        }
    }
}