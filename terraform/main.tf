### AWS AMIs ###
# Red Hat Enterprise Linux 8 (HVM), SSD Volume Type - ami-05220ffa0e7fce3d1
# RHEL-7.6_HVM-20190515-x86_64-0-Hourly2-GP2 - ami-01a834fd83ae239ff
# CentOS 7 Official - ami-0f2b4fc905b0bd1f1
# Ubuntu Server 18.04 LTS (HVM), SSD Volume Type - ami-0c55b159cbfafe1f0
# Ubuntu Server 16.04 LTS (HVM), SSD Volume Type - ami-0653e888ec96eab9b

### Links ###
# Subnets - https://hackernoon.com/manage-aws-vpc-as-infrastructure-as-code-with-terraform-55f2bdb3de2a
# Terraform & Ansible - https://medium.com/@mitesh_shamra/deploying-website-on-aws-using-terraform-and-ansible-f0251ae71f42


### Variables ###
variable "node_size" {
  description = "Default Node Size"
  default = "t3.medium"
}

variable "aws_region" {
  description = "Region for the VPC"
  default = "us-east-2"
}

variable "aws_subregion" {
  description = "Region for the VPC"
  default = "us-east-2a"
}

variable "vpc_cidr" {
  description = "CIDR for the VPC"
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR for the public subnet"
  default = "10.0.0.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR for the private subnet"
  default = "10.0.1.0/24"
}

variable "ami" {
  description = "Ubuntu Server 18.04 LTS (HVM), SSD Volume Type"
  default = "ami-0c55b159cbfafe1f0"
}

variable "science-eip" {
  description = "Science Elastic IP"
  default = "eipalloc-007f349f873e0aadf"
}

variable "test-eip" {
  description = "Test Elastic IP"
  default = "eipalloc-01e9044bb975107b4"
}

variable "prod-eip" {
  description = "Prod Elastic IP"
  default = "eipalloc-059497ae0dfb1b2fa"
}

variable "key_path" {
  description = "SSH Public Key path"
  default = "../../keys/mdas.pub"
}
###############


provider "aws" {
  region = "${var.aws_region}"
}


##### Keypair #####
resource "aws_key_pair" "mdas-key" {
  key_name = "mdas"
  public_key = "${file("../keys/mdas.pub")}"
}


##### VPC #####
resource "aws_vpc" "science-vpc" {
  cidr_block = "${var.vpc_cidr}"
  enable_dns_hostnames = true

  tags {
    Name = "mdas-vpc"
  }
}
//resource "aws_vpc" "test-vpc" {
//  cidr_block = "${var.vpc_cidr}"
//  enable_dns_hostnames = true
//
//  tags {
//    Name = "mdas-vpc"
//  }
//}
//resource "aws_vpc" "prod-vpc" {
//  cidr_block = "${var.vpc_cidr}"
//  enable_dns_hostnames = true
//
//  tags {
//    Name = "mdas-vpc"
//  }
//}


##### Subnets #####
resource "aws_subnet" "science-public-subnet" {
  vpc_id = "${aws_vpc.science-vpc.id}"
  cidr_block ="${var.public_subnet_cidr}"
  availability_zone = "${var.aws_subregion}"

  tags {
    Name = "Science Public Subnet"
  }
}

resource "aws_subnet" "science-private-subnet" {
  vpc_id = "${aws_vpc.science-vpc.id}"
  cidr_block = "${var.private_subnet_cidr}"
  availability_zone = "${var.aws_subregion}"

  tags {
    Name = "Science Private Subnet"
  }
}

//resource "aws_subnet" "test-public-subnet" {
//  vpc_id = "${aws_vpc.test-vpc.id}"
//  cidr_block ="${var.public_subnet_cidr}"
//  availability_zone = "${var.aws_subregion}"
//
//  tags {
//    Name = "Test Public Subnet"
//  }
//}
//
//resource "aws_subnet" "test-private-subnet" {
//  vpc_id = "${aws_vpc.test-vpc.id}"
//  cidr_block = "${var.private_subnet_cidr}"
//  availability_zone = "${var.aws_subregion}"
//
//  tags {
//    Name = "Test Private Subnet"
//  }
//}
//
//resource "aws_subnet" "prod-public-subnet" {
//  vpc_id = "${aws_vpc.prod-vpc.id}"
//  cidr_block ="${var.public_subnet_cidr}"
//  availability_zone = "${var.aws_subregion}"
//
//  tags {
//    Name = "Prod Public Subnet"
//  }
//}
//
//resource "aws_subnet" "prod-private-subnet" {
//  vpc_id = "${aws_vpc.prod-vpc.id}"
//  cidr_block = "${var.private_subnet_cidr}"
//  availability_zone = "${var.aws_subregion}"
//
//  tags {
//    Name = "Prod Private Subnet"
//  }
//}



##### Internet Gateway #####
resource "aws_internet_gateway" "science-gw" {
  vpc_id = "${aws_vpc.science-vpc.id}"

  tags {
    Name = "Science VPC IGW"
  }
}
resource "aws_eip" "science-nat-eip" {
  vpc      = true
}
resource "aws_nat_gateway" "science-nat-gw" {
  allocation_id = "${aws_eip.science-nat-eip.id}"
  subnet_id = "${aws_subnet.science-public-subnet.id}"
  depends_on = ["aws_internet_gateway.science-gw"]

  tags = {
    Name = "Science NAT GW"
  }
}

//resource "aws_internet_gateway" "test-gw" {
//  vpc_id = "${aws_vpc.test-vpc.id}"
//
//  tags {
//    Name = "Test VPC IGW"
//  }
//}
//resource "aws_eip" "test-nat-eip" {
//  vpc      = true
//}
//resource "aws_nat_gateway" "test-nat-gw" {
//  allocation_id = "${aws_eip.test-nat-eip.id}"
//  subnet_id = "${aws_subnet.test-public-subnet.id}"
//  depends_on = ["aws_internet_gateway.test-gw"]
//
//  tags = {
//    Name = "Test NAT GW"
//  }
//}
//
//resource "aws_internet_gateway" "prod-gw" {
//  vpc_id = "${aws_vpc.prod-vpc.id}"
//
//  tags {
//    Name = "Prod VPC IGW"
//  }
//}
//resource "aws_eip" "prod-nat-eip" {
//  vpc      = true
//}
//resource "aws_nat_gateway" "prod-nat-gw" {
//  allocation_id = "${aws_eip.prod-nat-eip.id}"
//  subnet_id = "${aws_subnet.prod-public-subnet.id}"
//  depends_on = ["aws_internet_gateway.prod-gw"]
//
//  tags = {
//    Name = "Prod NAT GW"
//  }
//}

##### Route Table #####
resource "aws_route_table" "science-public-rt" {
  vpc_id = "${aws_vpc.science-vpc.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.science-gw.id}"
  }

  tags {
    Name = "Science Public Subnet RT"
  }
}
resource "aws_route_table" "science-private-rt" {
  vpc_id = "${aws_vpc.science-vpc.id}"

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = "${aws_nat_gateway.science-nat-gw.id}"
  }

  tags {
    Name = "Science Private Subnet RT"
  }
}

//resource "aws_route_table" "test-public-rt" {
//  vpc_id = "${aws_vpc.test-vpc.id}"
//
//  route {
//    cidr_block = "0.0.0.0/0"
//    gateway_id = "${aws_internet_gateway.test-gw.id}"
//  }
//
//  tags {
//    Name = "Test Public Subnet RT"
//  }
//}
//resource "aws_route_table" "test-private-rt" {
//  vpc_id = "${aws_vpc.test-vpc.id}"
//
//  route {
//    cidr_block = "0.0.0.0/0"
//    nat_gateway_id = "${aws_nat_gateway.test-nat-gw.id}"
//  }
//
//  tags {
//    Name = "Test Private Subnet RT"
//  }
//}
//
//resource "aws_route_table" "prod-public-rt" {
//  vpc_id = "${aws_vpc.prod-vpc.id}"
//
//  route {
//    cidr_block = "0.0.0.0/0"
//    gateway_id = "${aws_internet_gateway.prod-gw.id}"
//  }
//
//  tags {
//    Name = "Prod Public Subnet RT"
//  }
//}
//resource "aws_route_table" "prod-private-rt" {
//  vpc_id = "${aws_vpc.prod-vpc.id}"
//
//  route {
//    cidr_block = "0.0.0.0/0"
//    nat_gateway_id = "${aws_nat_gateway.prod-nat-gw.id}"
//  }
//
//  tags {
//    Name = "Prod Private Subnet RT"
//  }
//}


resource "aws_route_table_association" "science-public-rta" {
  subnet_id = "${aws_subnet.science-public-subnet.id}"
  route_table_id = "${aws_route_table.science-public-rt.id}"
}
resource "aws_route_table_association" "science-private-rta" {
  subnet_id = "${aws_subnet.science-private-subnet.id}"
  route_table_id = "${aws_route_table.science-private-rt.id}"
}

//resource "aws_route_table_association" "test-public-rta" {
//  subnet_id = "${aws_subnet.test-public-subnet.id}"
//  route_table_id = "${aws_route_table.test-public-rt.id}"
//}
//resource "aws_route_table_association" "test-private-rta" {
//  subnet_id = "${aws_subnet.test-private-subnet.id}"
//  route_table_id = "${aws_route_table.test-private-rt.id}"
//}
//
//resource "aws_route_table_association" "prod-public-rta" {
//  subnet_id = "${aws_subnet.prod-public-subnet.id}"
//  route_table_id = "${aws_route_table.prod-public-rt.id}"
//}
//resource "aws_route_table_association" "prod-private-rta" {
//  subnet_id = "${aws_subnet.prod-private-subnet.id}"
//  route_table_id = "${aws_route_table.prod-private-rt.id}"
//}


##### Security Groups #####
resource "aws_security_group" "science-public-sg" {
  name = "science-public-sg"
  description = "Allow incoming HTTP connections & SSH access"
  vpc_id="${aws_vpc.science-vpc.id}"

//  ingress {
//    from_port = 80
//    to_port = 80
//    protocol = "tcp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = 443
//    to_port = 443
//    protocol = "tcp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = 22
//    to_port = 22
//    protocol = "tcp"
//    cidr_blocks =  ["0.0.0.0/0"]
//  }

  ingress {
    from_port = 0
    to_port = 65535
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = -1
    to_port = -1
    protocol = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "Science Public SG"
  }
}

resource "aws_security_group" "science-private-sg"{
  name = "science-private-sg"
  description = "Allow SSH traffic from public subnet"
  vpc_id = "${aws_vpc.science-vpc.id}"

  ingress {
    from_port = -1
    to_port = -1
    protocol = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 0
    to_port = 65535
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "Science Private SG"
  }
}

//resource "aws_security_group" "test-public-sg" {
//  name = "test-public-sg"
//  description = "Allow incoming HTTP connections & SSH access"
//  vpc_id="${aws_vpc.test-vpc.id}"
//
//  ingress {
//    from_port = 80
//    to_port = 80
//    protocol = "tcp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = 443
//    to_port = 443
//    protocol = "tcp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = -1
//    to_port = -1
//    protocol = "icmp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = 22
//    to_port = 22
//    protocol = "tcp"
//    cidr_blocks =  ["0.0.0.0/0"]
//  }
//
//  egress {
//    from_port = 0
//    to_port = 0
//    protocol = "-1"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  tags {
//    Name = "Test Public SG"
//  }
//}
//
//resource "aws_security_group" "test-private-sg"{
//  name = "test-private-sg"
//  description = "Allow SSH traffic from public subnet"
//  vpc_id = "${aws_vpc.test-vpc.id}"
//
//  ingress {
//    from_port = -1
//    to_port = -1
//    protocol = "icmp"
//    cidr_blocks = ["10.0.0.0/24"]
//  }
//
//  ingress {
//    from_port = 0
//    to_port = 65535
//    protocol = "tcp"
//    cidr_blocks = ["10.0.0.0/24"]
//  }
//
//  egress {
//    from_port = 0
//    to_port = 0
//    protocol = "-1"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  tags {
//    Name = "Test Private SG"
//  }
//}
//
//resource "aws_security_group" "prod-public-sg" {
//  name = "prod-public-sg"
//  description = "Allow incoming HTTP connections & SSH access"
//  vpc_id="${aws_vpc.prod-vpc.id}"
//
//  ingress {
//    from_port = 80
//    to_port = 80
//    protocol = "tcp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = 443
//    to_port = 443
//    protocol = "tcp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = -1
//    to_port = -1
//    protocol = "icmp"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  ingress {
//    from_port = 22
//    to_port = 22
//    protocol = "tcp"
//    cidr_blocks =  ["0.0.0.0/0"]
//  }
//
//  egress {
//    from_port = 0
//    to_port = 0
//    protocol = "-1"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  tags {
//    Name = "Prod Public SG"
//  }
//}
//
//resource "aws_security_group" "prod-private-sg"{
//  name = "prod-private-sg"
//  description = "Allow SSH traffic from public subnet"
//  vpc_id = "${aws_vpc.prod-vpc.id}"
//
//  ingress {
//    from_port = -1
//    to_port = -1
//    protocol = "icmp"
//    cidr_blocks = ["10.0.0.0/24"]
//  }
//
//  ingress {
//    from_port = 0
//    to_port = 65535
//    protocol = "tcp"
//    cidr_blocks = ["10.0.0.0/24"]
//  }
//
//  egress {
//    from_port = 0
//    to_port = 0
//    protocol = "-1"
//    cidr_blocks = ["0.0.0.0/0"]
//  }
//
//  tags {
//    Name = "Prod Private SG"
//  }
//}


##### Science Instances #####
resource "aws_instance" "science-master" {
  ami           = "${var.ami}"
  instance_type = "${var.node_size}"
  key_name      = "${aws_key_pair.mdas-key.id}"
  subnet_id     = "${aws_subnet.science-public-subnet.id}"
  vpc_security_group_ids      = ["${aws_security_group.science-public-sg.id}"]
  associate_public_ip_address = true
  source_dest_check           = false
  private_ip                  = "10.0.0.10"
  root_block_device {
    delete_on_termination = true
  }
  tags {
    Name = "Science Master"
  }

}

resource "aws_eip_association" "science-eipa" {
  instance_id   = "${aws_instance.science-master.id}"
  allocation_id = "${var.science-eip}"
}

resource "aws_instance" "science-node1" {
  ami           = "${var.ami}"
  instance_type = "${var.node_size}"
  key_name = "${aws_key_pair.mdas-key.id}"
  subnet_id = "${aws_subnet.science-private-subnet.id}"
  vpc_security_group_ids = ["${aws_security_group.science-private-sg.id}"]
  source_dest_check = false
  private_ip = "10.0.1.10"
  root_block_device {
    delete_on_termination = true
  }
  tags {
    Name = "Science Node 1"
  }
}
resource "aws_instance" "science-node2" {
  ami           = "${var.ami}"
  instance_type = "${var.node_size}"
  key_name = "${aws_key_pair.mdas-key.id}"
  subnet_id = "${aws_subnet.science-private-subnet.id}"
  vpc_security_group_ids = ["${aws_security_group.science-private-sg.id}"]
  source_dest_check = false
  private_ip = "10.0.1.11"
  root_block_device {
    delete_on_termination = true
  }
  tags {
    Name = "Science Node 2"
  }
}
resource "aws_instance" "science-node3" {
  ami           = "${var.ami}"
  instance_type = "${var.node_size}"
  key_name = "${aws_key_pair.mdas-key.id}"
  subnet_id = "${aws_subnet.science-private-subnet.id}"
  vpc_security_group_ids = ["${aws_security_group.science-private-sg.id}"]
  source_dest_check = false
  private_ip = "10.0.1.12"
  root_block_device {
    delete_on_termination = true
  }
  tags {
    Name = "Science Node 3"
  }
}

##### Test Instances #####
//resource "aws_instance" "test-master" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name      = "${aws_key_pair.mdas-key.id}"
//  subnet_id     = "${aws_subnet.test-public-subnet.id}"
//  vpc_security_group_ids      = ["${aws_security_group.test-public-sg.id}"]
//  associate_public_ip_address = true
//  source_dest_check           = false
//  private_ip                  = "10.0.0.10"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Test Master"
//  }
//
//}
//
//resource "aws_eip_association" "test-eipa" {
//  instance_id   = "${aws_instance.test-master.id}"
//  allocation_id = "${var.test-eip}"
//}
//
//resource "aws_instance" "test-node1" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name = "${aws_key_pair.mdas-key.id}"
//  subnet_id = "${aws_subnet.test-private-subnet.id}"
//  vpc_security_group_ids = ["${aws_security_group.test-private-sg.id}"]
//  source_dest_check = false
//  private_ip = "10.0.1.10"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Test Node 1"
//  }
//}
//resource "aws_instance" "test-node2" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name = "${aws_key_pair.mdas-key.id}"
//  subnet_id = "${aws_subnet.test-private-subnet.id}"
//  vpc_security_group_ids = ["${aws_security_group.test-private-sg.id}"]
//  source_dest_check = false
//  private_ip = "10.0.1.11"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Test Node 2"
//  }
//}
//resource "aws_instance" "test-node3" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name = "${aws_key_pair.mdas-key.id}"
//  subnet_id = "${aws_subnet.test-private-subnet.id}"
//  vpc_security_group_ids = ["${aws_security_group.test-private-sg.id}"]
//  source_dest_check = false
//  private_ip = "10.0.1.12"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Test Node 3"
//  }
//}

##### Prod Instances #####
//resource "aws_instance" "prod-master" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name      = "${aws_key_pair.mdas-key.id}"
//  subnet_id     = "${aws_subnet.prod-public-subnet.id}"
//  vpc_security_group_ids      = ["${aws_security_group.prod-public-sg.id}"]
//  associate_public_ip_address = true
//  source_dest_check           = false
//  private_ip                  = "10.0.0.10"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Prod Master"
//  }
//
//}
//
//resource "aws_eip_association" "prod-eipa" {
//  instance_id   = "${aws_instance.prod-master.id}"
//  allocation_id = "${var.prod-eip}"
//}
//
//resource "aws_instance" "prod-node1" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name = "${aws_key_pair.mdas-key.id}"
//  subnet_id = "${aws_subnet.prod-private-subnet.id}"
//  vpc_security_group_ids = ["${aws_security_group.prod-private-sg.id}"]
//  source_dest_check = false
//  private_ip = "10.0.1.10"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Prod Node 1"
//  }
//}
//resource "aws_instance" "prod-node2" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name = "${aws_key_pair.mdas-key.id}"
//  subnet_id = "${aws_subnet.prod-private-subnet.id}"
//  vpc_security_group_ids = ["${aws_security_group.prod-private-sg.id}"]
//  source_dest_check = false
//  private_ip = "10.0.1.11"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Prod Node 2"
//  }
//}
//resource "aws_instance" "prod-node3" {
//  ami           = "${var.ami}"
//  instance_type = "${var.node_size}"
//  key_name = "${aws_key_pair.mdas-key.id}"
//  subnet_id = "${aws_subnet.prod-private-subnet.id}"
//  vpc_security_group_ids = ["${aws_security_group.prod-private-sg.id}"]
//  source_dest_check = false
//  private_ip = "10.0.1.12"
//  root_block_device {
//    delete_on_termination = true
//  }
//  tags {
//    Name = "Prod Node 3"
//  }
//}

### Give time for environment to stabilize
resource "null_resource" "ansible-prod" {
  provisioner "local-exec" {
    command = "sleep 120"
  }
  depends_on = [
    "aws_instance.science-master"
//    "aws_instance.test-master",
//    "aws_instance.prod-master"
  ]
}
