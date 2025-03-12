pipeline {
    agent any
    
    environment {
        DOCKER_HUB_REPO = "anonymous2009/my-express-app"
    }
    
    stages {
        stage('Git Clone') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/Anonymous-2009/testing-ci.git'
                echo 'Clone done'
            }
        }
        
        stage('Set Dynamic Tag') {
            steps {
                script {
                    env.IMAGE_TAG = "build-${BUILD_NUMBER}"  // Use Jenkins build number
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                echo "Building Docker image: ${DOCKER_HUB_REPO}:${IMAGE_TAG}"
                sh "docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} ."
                echo 'Build done'
            }
        }
        
        stage('Docker Push') {
            steps {
                echo "Pushing Docker image: ${DOCKER_HUB_REPO}:${IMAGE_TAG}"
                withCredentials([usernamePassword(credentialsId: 'dockerhublogin', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh "docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}"
                }
                echo 'Push done'
            }
        }

      
    }
    
    post {
        success {
            echo "Build & Push successful."
            emailext subject: "Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "Build and push completed successfully. Docker Image: ${DOCKER_HUB_REPO}",
                     to: 'krishnabag751@gmail.com'
        }

        failure {
            echo "Build failed!"
            emailext subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "Jenkins build has failed. Check logs for details.",
                     to: 'krishnabag751@gmail.com'
        }
    }
}