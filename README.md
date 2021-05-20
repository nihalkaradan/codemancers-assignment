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

