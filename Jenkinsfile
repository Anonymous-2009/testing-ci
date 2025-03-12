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
            emailext attachLog: true,
                subject: "MarketVerse Build #${env.BUILD_NUMBER} - SUCCESS ✅",
                body: """
                    <html>
                    <body>
                        <h3 style="color: green;">✅ Build Successful!</h3>
                        <p>Project: <b>${env.JOB_NAME}</b></p>
                        <p>Build Number: <b>${env.BUILD_NUMBER}</b></p>
                        <p>URL: <a href='${env.BUILD_URL}'>Jenkins Build Link</a></p>
                    </body>
                    </html>
                """,
                to: 'krishnabag751@gmail.com',
                mimeType: 'text/html'
        }

        failure {
            emailext attachLog: true,
                subject: "MarketVerse Build #${env.BUILD_NUMBER} - ❌ FAILED",
                body: """
                    <html>
                    <body>
                        <h3 style="color: red;">❌ Build Failed!</h3>
                        <p>Project: <b>${env.JOB_NAME}</b></p>
                        <p>Build Number: <b>${env.BUILD_NUMBER}</b></p>
                        <p>Check the logs for more details.</p>
                    </body>
                    </html>
                """,
                to: 'krishnabag751@gmail.com',
                mimeType: 'text/html'
        }
    }
}