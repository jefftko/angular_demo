def label = "slave-${UUID.randomUUID().toString()}"
podTemplate(label: label, containers: [
    containerTemplate(
        name: 'jnlp', 
        image: 'jenkins/jnlp-slave:latest', 
        alwaysPullImage: false, 
        privileged: true,
        args: '${computer.jnlpmac} ${computer.name}'),
    containerTemplate(name: 'node', image: 'harbor.atcdevops.accenture.com/devops/idpbuildtool', command: 'cat', ttyEnabled: true,  privileged: true),
    containerTemplate(name: 'docker', image: 'docker:latest', command: 'cat', ttyEnabled: true,  privileged: true),
],
namespace: 'devops', serviceAccount: 'jenkins', 
volumes: [
    hostPathVolume(hostPath: '/home/jenkins', mountPath: '/home/jenkins'),
    hostPathVolume(hostPath: '/home/jenkins/.kube/config', mountPath: '/home/jenkins/.kube/config'),
    hostPathVolume(hostPath: '/home/jenkins/kubectl', mountPath: '/home/jenkins/kubectl'),
    hostPathVolume(hostPath: '/user/bin/docker', mountPath: '/user/bin/docker'),
    hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock'),
]) {
    node(label) {
        stage('Preparation') {
            
        }
        stage('Clone Source') {
            try{
                checkout([$class: 'GitSCM', branches: [[name: '*/release']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'SSHGitlabAccess', url: 'git@gitlab.atcdevops.accenture.com:IES_Asset/contract/frontend.git']]]) 
            }
            catch(err){
                error "${err}"
            }
        }
        stage('Compile') {
            container("node") {
                sh 'npm install'
                sh 'npm run build --prod'
            }
        }
        stage('Code Analysis') {
            container('node')
            {
                try {
                    withSonarQubeEnv('Sonarqube') {
                        sh 'export NODE_OPTIONS=--max_old_space_size=4096 && sonar-scanner -Dsonar.projectKey=IES_Asset_contract_frontend -Dsonar.projectName=IES_Asset_contract_frontend -X -Dsonar.sources=src -Dsonar.projectVersion=1.0.${BUILD_NUMBER} -Dsonar.language=js -Dsonar.sourceEncoding=UTF-8 -Dsonar.scm.enabled=false'
                    }
                } catch(err) {
                    error "${err}"
                }
            }
        }
        stage("SonarQube Quality Gate") 
        {
            container('node')
            {
                sh "cat .scannerwork/report-task.txt"
                def props = readProperties  file: '.scannerwork/report-task.txt'
                echo "properties=${props}"
                def sonarServerUrl=props['serverUrl']
                def ceTaskUrl= props['ceTaskUrl']
                def ceTask
                timeout(time: 1, unit: 'MINUTES') {
                    waitUntil {
                        def response = httpRequest ceTaskUrl
                        ceTask = readJSON text: response.content
                        echo ceTask.toString()
                        return "SUCCESS".equals(ceTask["task"]["status"])
                    }
                }
                def result = httpRequest url : sonarServerUrl + "/api/qualitygates/project_status?analysisId=" + ceTask["task"]["analysisId"], authentication: 'SONAR-SCANNER'
                def qualitygate =  readJSON text: result.content
                echo "Quality Gate Result: "+qualitygate.toString()
                if ("ERROR".equals(qualitygate["projectStatus"]["status"])) {
                    error  "Quality Gate failure"
                }
            }
        }
        stage('Build Image') {
            container('docker') {
                sh 'docker build -t harbor.atcdevops.accenture.com/chinagas/ies_asset/contract_frontend:1.0-$BUILD_NUMBER .'
                sh 'docker build -t harbor.atcdevops.accenture.com/chinagas/ies_asset/contract_frontend:latest .'
                withCredentials([usernamePassword(credentialsId: 'harbor', passwordVariable: 'password', usernameVariable: 'username')]) {
                    sh 'docker login harbor.atcdevops.accenture.com -u $username -p $password'
                }
                sh 'docker push harbor.atcdevops.accenture.com/chinagas/ies_asset/contract_frontend:1.0-$BUILD_NUMBER'
                sh 'docker push harbor.atcdevops.accenture.com/chinagas/ies_asset/contract_frontend:latest'
            }
        }
        
        stage('Deploy') {
            sh '/home/jenkins/kubectl apply -f deployment.yaml'
            sh '/home/jenkins/kubectl -n chinagas set image deploy contractfront contractfront=harbor.atcdevops.accenture.com/chinagas/ies_asset/contract_frontend:1.0-$BUILD_NUMBER'
        }
    }
}

