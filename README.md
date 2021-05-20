# codemancers-assignment
1. Create EC2 instance

2. Download and install jenkins
```bash
sudo yum update –y
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install jenkins java-1.8.0-openjdk-devel -y
sudo systemctl daemon-reload
sudo systemctl start jenkins
sudo systemctl status jenkins
```
3. Install "Docker pipeline" plugin and other common plugins

4. Install docker and add jenkins user to docker group

```bash
sudo yum install docker
sudo service docker start
sudo usermod -a -G docker jenkins
sudo chkconfig docker on
sudo reboot
```
5. Install nginx and setup nginx reverse proxy

```bash
sudo amazon-linux-extras install nginx1
```
/etc/nginx/nginx.conf
```bash
events {
  worker_connections  4096;  ## Default: 1024
}
http {
server {
        listen   80;

        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
                proxy_set_header X-NginX-Proxy true;
                proxy_pass http://localhost:8080/;
        }
}
}
```
```bash
sudo systemctl restart nginx
sudo systemctl enable nginx
```
6. Install pip and ansible

```bash
yum install python python-devel python-pip openssl -y
sudo amazon-linux-extras install ansible2
```
7. Install kubectl and aws cli

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.20.4/2021-04-12/bin/linux/amd64/kubectl

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```

8. Create ansible playbook playbook.yml

```bash
- hosts: localhost
  vars:
    ImageName: ""
    Namespace: ""
    imageTag: ""
  #remote_user: ansible
  #become: true
  gather_facts: no
  connection: local
  tasks:
    - name: Create MYSQL configmap
      command: "kubectl create -f ./mysql/mysql-config-map.yml"
      ignore_errors: yes
    - name: MYSQL service and deployment 
      command: "kubectl create -f ./mysql/mysql-deployment.yml"
      ignore_errors: yes
    - name: Books App service and deployment 
      command: "kubectl create -f ./book-app/deployment-node.yml"
      ignore_errors: yes
```
9. Spin up Kubernetes cluster with KOPS

create s3 bucket to store state
```bash 
s3://kops-state-13
```
Install kops

```bash
curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64

```
Spin up cluster
```bash
ssh-keygen -f .ssh/id_rsa
export KOPS_STATE_STORE=s3://kops-state-13
kops create cluster mycluster.k8s.local --node-count=1 --node-size=t3.small --master-size=t3.small --zones ap-south-1a --yes
sudo cp .kube/config /var/lib/jenkins/.kube/config
sudo chown jenkins /var/lib/jenkins/.kube/config
```

10. Create Jenkins pipeline
```bash
# Create webhook in github dashboard 
https://github.com/nihalkaradan/codemancers-assignment
```
Create job

```bash
# create dockerhub credential 
node {
    def registryCredential = 'dockerhub_id'
    stage('Preparation') { 
        
        git 'https://github.com/nihalkaradan/codemancers-assignment'
        
        
    }
    stage('Build and Publish'){
        withDockerRegistry([ credentialsId: "${registryCredential}", url: "" ]) {
            sh "docker build ./book-app -t nihalkaradan/codemancers-crud-app:1.4"
            sh "docker push nihalkaradan/codemancers-crud-app:1.4"
        }
    }
    stage('Deploy to K8s'){
        sh "ansible-playbook playbook.yml  --user=jenkins "
    }
    
}
```



