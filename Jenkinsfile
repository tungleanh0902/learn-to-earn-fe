pipeline {
    agent any
    stages {
        stage('Checkout Environment') {
            steps {
                script {
                    if (env.GIT_BRANCH == 'origin/master') {
                        target = 'production'
                    } else if (env.GIT_BRANCH == 'origin/development/dev') {
                        target = 'develop'
                    } else {
                    }
                }
            }
        }

        stage('Build image') {
            when {
                expression { target == 'develop' || target == 'production'}
            }
            steps {
                script {
                    if (target == 'develop') {
                        echo "Build image from develop"
                        sshagent(['0a39231d-d882-4824-ae7f-0d892c489685']) {
                                sh """ssh -o StrictHostKeyChecking=no builder@206.189.158.254 << EOF
                                    cd /home/builder/resource/l2e.eupsolution.net/web-client
                                    git checkout development/dev
                                    git pull origin development/dev
                                    docker build -t registry.gitlab.com/eupsolution/learn_to_earn_fe:${GIT_COMMIT} .
                                    docker push registry.gitlab.com/eupsolution/learn_to_earn_fe:${GIT_COMMIT}
                                    docker rmi registry.gitlab.com/eupsolution/learn_to_earn_fe:${GIT_COMMIT}
                                exit
                            EOF"""
                        }
                    }
                }
            }
        }

        stage ('Deploy') {
            when {
                expression { target == 'develop' || target == 'production' }
            }
            steps {
                script {
                    if (target == 'develop') {
                        echo "Deploy to develop"
                        sshagent(['0a39231d-d882-4824-ae7f-0d892c489685']) {
                                sh """ssh -o StrictHostKeyChecking=no mazii@157.245.203.48 << EOF
                                    cd /home/mazii/resource/l2e.eupsolution.net/web-client
                                    git pull origin development/dev
                                    docker pull registry.gitlab.com/eupsolution/learn_to_earn_fe:${GIT_COMMIT}
                                    exit
                                EOF"""
                                sh """ssh -o StrictHostKeyChecking=no ansible@128.199.189.121 << EOF
                                    docker service scale l2e_web-client=2
                                    docker service update --image registry.gitlab.com/eupsolution/learn_to_earn_fe:${GIT_COMMIT} l2e_web-client
                                    docker service scale l2e_web-client=1
                                exit
                            EOF"""
                        }
                    }
                }
            }
        }
    }
}
