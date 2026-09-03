# Linux for DevOps - Complete Command Reference Guide

## Table of Contents
1. [Linux Basics](#linux-basics)
2. [File and Directory Management](#file-and-directory-management)
3. [User and Permissions Management](#user-and-permissions-management)
4. [Process and System Management](#process-and-system-management)
5. [Networking Commands](#networking-commands)
6. [Package Management](#package-management)
7. [Log Management](#log-management)
8. [Disk and Storage Management](#disk-and-storage-management)
9. [System Monitoring and Performance](#system-monitoring-and-performance)
10. [Text Processing and Manipulation](#text-processing-and-manipulation)
11. [Archive and Compression](#archive-and-compression)
12. [SSH and Remote Access](#ssh-and-remote-access)
13. [Firewall and Security](#firewall-and-security)
14. [Systemd and Services](#systemd-and-services)
15. [Docker and Containers](#docker-and-containers)
16. [System Maintenance](#system-maintenance)

---

## 1. Linux Basics

### pwd (Print Working Directory)
```bash
pwd
```
**Purpose:** Displays the full path of the current directory you're working in.
**Explanation:** Useful when navigating through directories to know your current location.
**Example:** If you're in `/home/user/documents`, running `pwd` will output `/home/user/documents`

### ls (List Directory Contents)
```bash
ls                    # List files in current directory
ls -l                 # Long format with permissions, owner, size, date
ls -a                 # Show all files including hidden files (starting with .)
ls -lh                # Long format with human-readable file sizes
ls -R                 # Recursive listing of all subdirectories
ls -t                 # Sort by modification time
ls -S                 # Sort by file size
ls /path/to/dir       # List contents of a specific directory
```
**Purpose:** Lists files and directories in a location.
**Explanation:** The most frequently used command for viewing directory contents with various options.
- `-l`: Shows detailed information (permissions, owner, size, modification date)
- `-h`: Makes sizes human-readable (KB, MB, GB instead of bytes)
- `-R`: Shows all nested directories
- `-a`: Includes hidden files (those starting with a dot)

### cd (Change Directory)
```bash
cd /home/user          # Change to absolute path
cd ../                 # Go up one directory
cd ~                   # Go to home directory
cd -                   # Go to previous directory
cd                     # Go to home directory (same as cd ~)
```
**Purpose:** Changes your current working directory.
**Explanation:** Essential for navigating the filesystem. The tilde (~) represents the home directory.

### mkdir (Make Directory)
```bash
mkdir mydir                    # Create a single directory
mkdir -p /path/to/deep/dir    # Create nested directories (parent directories if needed)
mkdir dir1 dir2 dir3          # Create multiple directories at once
```
**Purpose:** Creates new directories.
**Explanation:** 
- Use `-p` flag to create parent directories automatically
- Without `-p`, only the final directory is created; parent directories must already exist

### cp (Copy Files or Directories)
```bash
cp file1.txt file2.txt         # Copy a file
cp -r dir1 dir2                # Copy directory recursively
cp file.txt /home/user/        # Copy file to another location
cp -v file1.txt file2.txt      # Verbose mode (shows what's being copied)
cp -i file1.txt file2.txt      # Interactive (asks before overwriting)
```
**Purpose:** Copies files or directories.
**Explanation:**
- Without `-r`, directories cannot be copied
- `-v` shows the operation details
- `-i` prevents accidental overwrites

### mv (Move or Rename Files)
```bash
mv oldname.txt newname.txt     # Rename a file
mv file.txt /home/user/        # Move file to another location
mv -i file.txt newlocation/    # Interactive mode
```
**Purpose:** Moves or renames files and directories.
**Explanation:** Can be used for both renaming and moving to different locations.

### rm (Remove Files)
```bash
rm file.txt                    # Delete a file
rm -r directory/               # Delete directory and its contents recursively
rm -f file.txt                 # Force deletion without confirmation
rm -i file.txt                 # Interactive (ask before deleting)
rm *.log                       # Delete all files matching pattern
```
**Purpose:** Deletes files or directories.
**Explanation:**
- **WARNING:** Deletion is permanent; there's no recovery
- `-r`: Required to delete directories
- `-f`: Forces deletion (use carefully)
- `-i`: Asks for confirmation before each deletion

### touch (Create Empty File or Update Timestamp)
```bash
touch newfile.txt              # Create an empty file
touch file.txt                 # Update the timestamp of existing file
touch -t 202301011200 file.txt # Set specific timestamp
```
**Purpose:** Creates empty files or updates file modification timestamps.
**Explanation:** Commonly used in DevOps to create placeholder files or reset timestamps.

### cat (Concatenate and Display File Contents)
```bash
cat file.txt                   # Display file contents
cat file1.txt file2.txt        # Display multiple files
cat file.txt | less            # Display with pagination
```
**Purpose:** Displays file contents.
**Explanation:** Simple way to view small to medium-sized files. For large files, use `less` or `more`.

### less / more (View File Contents with Pagination)
```bash
less largefile.txt             # View file with scrolling
more largefile.txt             # Similar to less (older)
```
**Purpose:** View file contents one page at a time.
**Explanation:**
- Press `q` to quit
- Press `space` to go to next page
- Press `b` to go to previous page
- `/` to search within the file

### head / tail (View Beginning or End of File)
```bash
head file.txt                  # Show first 10 lines
head -n 20 file.txt            # Show first 20 lines
tail file.txt                  # Show last 10 lines
tail -n 20 file.txt            # Show last 20 lines
tail -f logfile.log            # Follow log file (show new lines as added)
tail -F logfile.log            # Follow with file reopening (survives rotation)
```
**Purpose:** View specific parts of files.
**Explanation:**
- `head`: Shows the beginning
- `tail`: Shows the end
- `-f`: Follows file in real-time (useful for logs)
- `-F`: Like `-f` but handles file rotation

---

## 2. File and Directory Management

### find (Search for Files)
```bash
find /path -name "*.log"       # Find files matching pattern
find . -type f -name "*.txt"   # Find files (not directories) with .txt extension
find . -type d -name "test"    # Find directories named "test"
find . -size +100M             # Find files larger than 100MB
find . -mtime -7               # Find files modified in last 7 days
find . -perm 644               # Find files with specific permissions
find . -name "*.log" -delete    # Find and delete matching files
find . -name "*.log" -exec rm {} \;  # Find and execute command on each
```
**Purpose:** Searches for files based on various criteria.
**Explanation:**
- Powerful tool for locating files across directory trees
- `-name`: Search by filename
- `-type`: Filter by type (f=file, d=directory, l=symlink)
- `-size`: Filter by size
- `-mtime`: Filter by modification time
- `-exec`: Execute command on each found file

### grep (Search within Files)
```bash
grep "pattern" file.txt        # Search for pattern in file
grep -r "pattern" /path        # Search recursively in directory
grep -i "pattern" file.txt     # Case-insensitive search
grep -v "pattern" file.txt     # Show lines NOT matching pattern
grep -n "pattern" file.txt     # Show line numbers
grep -c "pattern" file.txt     # Count matching lines
grep "^error" file.txt         # Search lines starting with "error"
grep "error$" file.txt         # Search lines ending with "error"
```
**Purpose:** Searches for text patterns within files.
**Explanation:**
- One of the most used commands in DevOps
- `-r`: Search recursively through directories
- `-i`: Ignore case
- `-v`: Invert match (show non-matching lines)
- Supports regular expressions for advanced patterns

### sed (Stream Editor)
```bash
sed 's/old/new/' file.txt      # Replace first occurrence on each line
sed 's/old/new/g' file.txt     # Replace all occurrences
sed -i 's/old/new/g' file.txt  # In-place replacement
sed '10d' file.txt             # Delete line 10
sed '1,5d' file.txt            # Delete lines 1 to 5
sed -n '5,10p' file.txt        # Print lines 5 to 10
sed 's/^/PREFIX_/' file.txt    # Add prefix to each line
```
**Purpose:** Stream editor for text manipulation.
**Explanation:**
- Processes text line by line
- `-i`: Modifies file in place
- Can use regular expressions for complex replacements
- Useful in DevOps scripts for config file manipulation

### awk (Text Processing)
```bash
awk '{print $1}' file.txt      # Print first column
awk '{print $1, $3}' file.txt  # Print columns 1 and 3
awk -F: '{print $1}' /etc/passwd  # Use colon as delimiter
awk '{sum += $1} END {print sum}' file.txt  # Sum first column
awk 'NR>1' file.txt            # Print all lines except header
awk '$2 > 100' file.txt        # Print rows where column 2 > 100
```
**Purpose:** Powerful text processing language.
**Explanation:**
- `-F`: Set field delimiter
- `$1, $2, ...`: Refer to columns
- `NR`: Line number variable
- `END`: Execute code after processing all lines
- Excellent for parsing log files and data

### sort (Sort Lines)
```bash
sort file.txt                  # Sort alphabetically
sort -n file.txt               # Sort numerically
sort -r file.txt               # Sort in reverse order
sort -u file.txt               # Sort and remove duplicates
sort -k2 file.txt              # Sort by second column
sort -t: -k3 -n /etc/passwd    # Sort by specific field with delimiter
```
**Purpose:** Sorts lines of text.
**Explanation:** Essential for organizing data in scripts and reports.

### uniq (Remove or Report Duplicates)
```bash
uniq file.txt                  # Remove consecutive duplicate lines
sort file.txt | uniq           # Remove all duplicates (must sort first)
uniq -c file.txt               # Count duplicate lines
uniq -d file.txt               # Show only duplicate lines
uniq -u file.txt               # Show only unique lines
```
**Purpose:** Removes or identifies duplicate lines.
**Explanation:** Usually used with `sort` command for effective deduplication.

### wc (Word/Line Count)
```bash
wc -l file.txt                 # Count lines
wc -w file.txt                 # Count words
wc -c file.txt                 # Count bytes
wc -L file.txt                 # Show longest line length
```
**Purpose:** Counts lines, words, and characters.
**Explanation:** Useful for analyzing file sizes and log volumes.

### diff (Compare Files)
```bash
diff file1.txt file2.txt       # Show differences between files
diff -u file1.txt file2.txt    # Unified diff format
diff -r dir1 dir2              # Compare directories recursively
```
**Purpose:** Shows differences between files.
**Explanation:** Essential for comparing configurations and code.

---

## 3. User and Permissions Management

### whoami (Current User)
```bash
whoami                         # Display current user
```
**Purpose:** Shows the current logged-in user.
**Explanation:** Useful to verify identity before executing privileged commands.

### id (User and Group IDs)
```bash
id                             # Show current user and group info
id username                    # Show info for specific user
```
**Purpose:** Displays user and group IDs.
**Explanation:** Shows UID, GID, and group memberships.

### useradd / adduser (Create User)
```bash
useradd -m username            # Create user with home directory
useradd -s /bin/bash username  # Create user with specific shell
useradd -G sudo username       # Add user to sudo group
useradd -d /home/custom username  # Specify home directory
```
**Purpose:** Creates new user accounts.
**Explanation:**
- `-m`: Create home directory
- `-s`: Set login shell
- `-G`: Add to secondary groups
- Usually requires root privileges

### usermod (Modify User)
```bash
usermod -aG sudo username      # Add user to sudo group
usermod -s /bin/bash username  # Change login shell
usermod -d /new/home username  # Change home directory
usermod -L username            # Lock user account
usermod -U username            # Unlock user account
```
**Purpose:** Modifies user account properties.
**Explanation:**
- `-aG`: Append to groups (use `-a` to avoid removing existing groups)
- `-L`: Lock account (prevents login)
- `-U`: Unlock account

### userdel (Delete User)
```bash
userdel username               # Delete user (keep home directory)
userdel -r username            # Delete user and home directory
```
**Purpose:** Removes user accounts.
**Explanation:** 
- Use `-r` to also remove home directory and mail
- Data loss is permanent

### passwd (Change Password)
```bash
passwd                         # Change current user password
passwd username                # Change another user's password (root only)
passwd -e username             # Force user to change password at next login
passwd -l username             # Lock user account
```
**Purpose:** Changes user passwords.
**Explanation:** Essential for security management.

### chmod (Change File Permissions)
```bash
chmod 755 file.sh              # rwxr-xr-x (executable script)
chmod 644 file.txt             # rw-r--r-- (readable file)
chmod 600 file.txt             # rw------- (private file)
chmod +x script.sh             # Add execute permission
chmod -x script.sh             # Remove execute permission
chmod u+w file.txt             # Add write permission for owner
chmod g-r file.txt             # Remove read permission for group
chmod -R 755 directory         # Recursive change
```
**Purpose:** Changes file and directory permissions.
**Explanation:**
- **Permission Digits:**
  - 4 = read (r)
  - 2 = write (w)
  - 1 = execute (x)
  - Sum for each: owner, group, others
- Examples:
  - 755 = rwxr-xr-x (7=4+2+1, 5=4+1)
  - 644 = rw-r--r-- (6=4+2)
  - 600 = rw------- (6=4+2)

### chown (Change Owner)
```bash
chown username file.txt        # Change file owner
chown username:groupname file.txt  # Change owner and group
chown -R username directory    # Recursive change
chown :groupname file.txt      # Change group only
```
**Purpose:** Changes file and directory owner.
**Explanation:**
- Only root can change owner
- User can change group to groups they belong to
- `-R`: Applies recursively to directories

### chgrp (Change Group)
```bash
chgrp groupname file.txt       # Change file group
chgrp -R groupname directory   # Recursive change
```
**Purpose:** Changes file group ownership.
**Explanation:** Similar to `chown` but only changes group.

### sudo (Execute as Root)
```bash
sudo command                   # Execute command as root
sudo -u username command       # Execute as specific user
sudo -i                        # Start interactive root shell
sudo -l                        # List sudo privileges
sudo !!                        # Re-run last command with sudo
```
**Purpose:** Execute commands with elevated privileges.
**Explanation:**
- Requires user to be in sudoers file
- `-u`: Execute as different user
- `-i`: Interactive root shell (loads root environment)

### groups (Show User Groups)
```bash
groups                         # Show groups of current user
groups username                # Show groups of specific user
```
**Purpose:** Lists groups a user belongs to.
**Explanation:** Important for understanding permissions.

---

## 4. Process and System Management

### ps (Process Status)
```bash
ps                             # Show current user processes
ps aux                         # Show all processes with details
ps -ef                         # Show all processes in different format
ps aux | grep python           # Find specific process
ps -p 1234                     # Show specific PID
ps -l                          # Long format
ps --forest                    # Show process tree
```
**Purpose:** Lists running processes.
**Explanation:**
- `aux`: Shows all processes with user, CPU, memory usage
- Useful for monitoring and troubleshooting

### top (Interactive Process Monitor)
```bash
top                            # Show live process monitoring
top -p 1234                    # Monitor specific PID
top -b -n 1                    # Batch mode (single output)
top -u username                # Show processes of specific user
```
**Purpose:** Displays real-time process and system information.
**Explanation:**
- Press `q` to quit
- Press `M` to sort by memory
- Press `P` to sort by CPU
- Shows CPU, memory, swap usage

### htop (Enhanced Process Monitor)
```bash
htop                           # Enhanced interactive process monitor
htop -p 1234                   # Monitor specific PID
htop -u username               # Show processes of specific user
```
**Purpose:** User-friendly alternative to `top`.
**Explanation:**
- More colorful and easier to use than `top`
- May need to be installed separately
- Better navigation and sorting options

### kill (Terminate Process)
```bash
kill 1234                      # Send SIGTERM to process (graceful)
kill -9 1234                   # Send SIGKILL to process (force kill)
kill -15 1234                  # Send SIGTERM (default, same as kill 1234)
kill -0 1234                   # Check if process exists (no signal sent)
killall process_name           # Kill all processes with name
```
**Purpose:** Terminates processes.
**Explanation:**
- SIGTERM (15): Graceful termination (process can clean up)
- SIGKILL (9): Force termination (cannot be caught)
- Always try SIGTERM before SIGKILL

### killall / pkill (Kill by Name)
```bash
killall python                 # Kill all python processes
pkill -f "python script.py"    # Kill matching process
pkill -u username              # Kill all processes of user
```
**Purpose:** Kills processes by name or pattern.
**Explanation:** Useful when you don't know the PID.

### bg / fg (Background/Foreground)
```bash
command &                      # Run command in background
bg                             # Resume suspended job in background
fg                             # Bring background job to foreground
jobs                           # List background jobs
```
**Purpose:** Manages background and foreground processes.
**Explanation:**
- Suspend with `Ctrl+Z`
- `&` at end runs in background
- Useful for long-running tasks

### nice / renice (Process Priority)
```bash
nice -n 10 command             # Run with lower priority (higher number = lower priority)
nice -n -10 command            # Run with higher priority (negative = higher, needs root)
renice 10 -p 1234              # Change priority of running process
```
**Purpose:** Sets or changes process priority.
**Explanation:**
- Range: -20 (highest) to 19 (lowest)
- Default is 0
- Lower priority = process waits longer for CPU

### nohup (No Hangup)
```bash
nohup command &                # Run command immune to terminal disconnect
nohup command > output.log 2>&1 &  # Redirect output
```
**Purpose:** Runs process immune to terminal disconnection.
**Explanation:**
- Useful for running long jobs over SSH
- Output goes to `nohup.out` by default

### shutdown / reboot / halt
```bash
shutdown -h now                # Shutdown immediately
shutdown -h +10                # Shutdown in 10 minutes
shutdown -h 23:00              # Shutdown at 23:00
shutdown -r now                # Reboot immediately
reboot                         # Reboot (same as shutdown -r)
halt                           # Halt system without powering down
```
**Purpose:** System shutdown and reboot.
**Explanation:**
- `-h`: Halt (power off)
- `-r`: Reboot
- Use with caution in production

### systemctl (System Control)
```bash
systemctl start service        # Start a service
systemctl stop service         # Stop a service
systemctl restart service      # Restart a service
systemctl reload service       # Reload configuration
systemctl status service       # Show service status
systemctl enable service       # Enable service at boot
systemctl disable service      # Disable service at boot
systemctl list-units --type=service  # List all services
```
**Purpose:** Manages systemd services.
**Explanation:**
- Primary way to manage services in modern Linux
- Essential for DevOps work

### systemd-analyze (Analyze Boot Performance)
```bash
systemd-analyze                # Show boot time
systemd-analyze blame          # Show slowest services on boot
systemd-analyze critical-chain # Show critical boot chain
```
**Purpose:** Analyzes systemd boot performance.
**Explanation:** Useful for optimizing system startup time.

### dmesg (Kernel Messages)
```bash
dmesg                          # Show kernel ring buffer
dmesg | tail                   # Show recent kernel messages
dmesg | grep -i error          # Show kernel errors
```
**Purpose:** Displays kernel messages.
**Explanation:** Useful for troubleshooting hardware and system issues.

---

## 5. Networking Commands

### ifconfig / ip (Network Configuration)
```bash
ifconfig                       # Show all network interfaces
ifconfig eth0                  # Show specific interface
ip addr show                   # Show IP addresses (newer)
ip link show                   # Show network devices
ip addr add 192.168.1.100/24 dev eth0  # Add IP address
ip addr del 192.168.1.100/24 dev eth0  # Remove IP address
```
**Purpose:** Displays and configures network interfaces.
**Explanation:**
- `ifconfig` is older; `ip` is newer and more powerful
- Shows IP, netmask, MAC address, etc.

### ping (Network Connectivity)
```bash
ping google.com                # Test connectivity to host
ping -c 4 google.com           # Send 4 packets
ping -i 2 google.com           # Wait 2 seconds between packets
ping -w 5000 google.com        # Timeout after 5 seconds
```
**Purpose:** Tests connectivity to remote hosts.
**Explanation:**
- Sends ICMP packets and waits for response
- `-c`: Number of packets to send (Linux)
- If host responds, connection is working

### traceroute / tracert (Trace Route to Host)
```bash
traceroute google.com          # Show route to host
traceroute -m 30 google.com    # Set max hops to 30
```
**Purpose:** Shows the path packets take to reach a host.
**Explanation:**
- Each line shows a hop (router) to destination
- Useful for diagnosing network issues

### nslookup / dig (DNS Lookup)
```bash
nslookup google.com            # Query DNS for IP address
nslookup -type=MX google.com   # Look up MX records
dig google.com                 # Detailed DNS query
dig @8.8.8.8 google.com        # Query specific DNS server
dig +short google.com          # Short output
dig google.com +trace          # Show full DNS path
```
**Purpose:** Queries DNS for domain information.
**Explanation:**
- `dig` is more powerful than `nslookup`
- Shows multiple record types (A, MX, NS, etc.)

### host (DNS Lookup)
```bash
host google.com                # Show IP of domain
host -a google.com             # Show all records
```
**Purpose:** Simple DNS lookup.
**Explanation:** Lightweight alternative to `dig`.

### netstat (Network Statistics)
```bash
netstat -an                    # Show all network connections
netstat -tulpn                 # Show listening ports with process
netstat -i                     # Show interface statistics
netstat -s                     # Show protocol statistics
```
**Purpose:** Shows network connections and statistics.
**Explanation:**
- `-t`: TCP connections
- `-u`: UDP connections
- `-l`: Listening ports
- `-p`: Show process info

### ss (Socket Statistics - Newer)
```bash
ss -an                         # Show all network connections
ss -tulpn                      # Show listening ports with process
ss -i                          # Show interface statistics
ss src :80                     # Show connections to port 80
```
**Purpose:** Modern replacement for `netstat`.
**Explanation:**
- Faster and more efficient than `netstat`
- Same options as `netstat`

### lsof (List Open Files/Network)
```bash
lsof -i                        # Show all network connections
lsof -i :8080                  # Show what's using port 8080
lsof -p 1234                   # Show files/network opened by PID
lsof -u username               # Show files/network opened by user
```
**Purpose:** Lists open files and network connections.
**Explanation:**
- Shows which process has file/port open
- Useful for port conflicts

### nc / ncat (NetCat - Network Tool)
```bash
nc -zv host 80                 # Test if port is open
nc -l 8080                     # Listen on port 8080
echo "message" | nc host 1234  # Send data to host:port
nc -w 2 host 80                # Connect with 2 second timeout
```
**Purpose:** Network utility for reading/writing network connections.
**Explanation:**
- Powerful tool for network testing
- Can be used to transfer files or create backdoors

### curl (Data Transfer Tool)
```bash
curl https://example.com       # Fetch webpage
curl -o output.html https://example.com  # Save output to file
curl -H "Header: value" https://example.com  # Add custom header
curl -X POST -d "data=value" https://example.com  # POST request
curl -u username:password https://example.com  # Basic auth
curl -I https://example.com    # Show headers only
curl -L https://example.com    # Follow redirects
```
**Purpose:** Transfer data using URLs.
**Explanation:**
- One of the most used DevOps tools
- Supports HTTP, HTTPS, FTP, and other protocols
- Essential for API interactions

### wget (Download Files)
```bash
wget https://example.com/file.zip  # Download file
wget -O output.zip https://example.com/file.zip  # Save with custom name
wget -c https://example.com/file.zip  # Resume download
wget -r https://example.com    # Recursive download (mirror)
```
**Purpose:** Downloads files from the internet.
**Explanation:**
- Can resume interrupted downloads
- Can recursively mirror websites

### iptables (Firewall Rules)
```bash
iptables -L                    # List all rules
iptables -A INPUT -p tcp --dport 80 -j ACCEPT  # Allow port 80
iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # Allow SSH
iptables -D INPUT 1            # Delete rule 1
iptables -F                    # Flush all rules
iptables-save                  # Save rules to file
iptables-restore < rules.txt   # Restore rules from file
```
**Purpose:** Configures firewall rules.
**Explanation:**
- Complex but powerful
- `-A`: Add rule
- `-D`: Delete rule
- `-L`: List rules
- `-F`: Flush rules

### firewall-cmd (Firewall Control - RHEL/CentOS)
```bash
firewall-cmd --list-all        # Show firewall configuration
firewall-cmd --add-service=http  # Allow HTTP
firewall-cmd --remove-service=http  # Remove HTTP
firewall-cmd --add-port=8080/tcp  # Allow port 8080
firewall-cmd --remove-port=8080/tcp  # Remove port
firewall-cmd --permanent       # Make changes permanent (add to previous commands)
firewall-cmd --reload          # Reload configuration
```
**Purpose:** Manages firewall on RHEL/CentOS systems.
**Explanation:** Higher-level interface than `iptables`.

---

## 6. Package Management

### APT (Debian/Ubuntu)
```bash
apt update                     # Update package lists
apt upgrade                    # Upgrade all packages
apt install package_name       # Install package
apt remove package_name        # Remove package
apt search package_name        # Search for package
apt show package_name          # Show package details
apt full-upgrade               # Upgrade with dependency handling
apt autoremove                 # Remove unused dependencies
apt clean                      # Remove cached packages
apt list --installed           # List installed packages
```
**Purpose:** Package manager for Debian/Ubuntu systems.
**Explanation:**
- Always run `apt update` before installing
- `upgrade`: Upgrades within version constraints
- `full-upgrade`: May upgrade major versions

### yum / dnf (RHEL/CentOS/Fedora)
```bash
yum check-update               # Check for updates
yum update                     # Update all packages
yum install package_name       # Install package
yum remove package_name        # Remove package
yum search package_name        # Search for package
yum info package_name          # Show package info
yum groupinstall "groupname"   # Install package group
yum clean all                  # Clean cache
yum list installed             # List installed packages
dnf install package_name       # dnf is newer (same syntax)
```
**Purpose:** Package manager for RHEL-based systems.
**Explanation:**
- `dnf` is newer; `yum` is older but still works
- `groupinstall`: Install multiple related packages

### pip (Python Package Manager)
```bash
pip install package_name       # Install Python package
pip install --upgrade package  # Upgrade package
pip uninstall package_name     # Remove package
pip list                       # List installed packages
pip show package_name          # Show package details
pip install -r requirements.txt  # Install from requirements file
pip freeze > requirements.txt   # Create requirements file
```
**Purpose:** Installs Python packages.
**Explanation:**
- `pip3` for Python 3
- Can specify versions: `pip install package==1.0.0`
- `requirements.txt` for reproducible installs

### npm (Node.js Package Manager)
```bash
npm install                    # Install dependencies from package.json
npm install package_name       # Install package
npm install -g package_name    # Install globally
npm uninstall package_name     # Remove package
npm list                       # List installed packages
npm update                     # Update packages
npm search package_name        # Search for package
```
**Purpose:** Installs Node.js packages.
**Explanation:**
- Uses `package.json` for dependencies
- `-g`: Global installation (system-wide)

### tar (Archive Tool)
```bash
tar -czf archive.tar.gz folder/  # Create compressed archive
tar -xzf archive.tar.gz        # Extract compressed archive
tar -tf archive.tar.gz         # List contents without extracting
tar -czf - folder/ | ssh host "tar -xz" # Tar and pipe over SSH
```
**Purpose:** Creates and extracts tar archives.
**Explanation:**
- `-c`: Create archive
- `-x`: Extract
- `-z`: Gzip compression
- `-f`: File (must be last)
- `-v`: Verbose

---

## 7. Log Management

### journalctl (Systemd Journal)
```bash
journalctl                     # Show all logs
journalctl -n 50               # Show last 50 entries
journalctl -f                  # Follow logs in real-time
journalctl -u service_name     # Show logs for specific service
journalctl --since "2024-01-01" # Show logs since date
journalctl --since "-1 hour"   # Show logs from last hour
journalctl -p err              # Show error level and above
journalctl -o short            # Short output format
journalctl --disk-usage        # Show journal disk usage
journalctl --vacuum-time=7d    # Keep only last 7 days of logs
```
**Purpose:** Views systemd journal logs.
**Explanation:**
- Centralized logging in modern Linux systems
- `-u`: Filter by service unit
- `-p`: Filter by priority level (err, warning, info, debug)
- `-f`: Real-time follow (like `tail -f`)

### /var/log (Log Directory)
```bash
tail -f /var/log/syslog        # Follow system logs
tail -f /var/log/auth.log      # Follow authentication logs
cat /var/log/dmesg             # Show kernel messages
tail -f /var/log/apache2/access.log  # Follow Apache access log
tail -f /var/log/nginx/error.log     # Follow Nginx error log
```
**Purpose:** Centralized location for system and application logs.
**Explanation:**
- `/var/log/syslog`: System messages
- `/var/log/auth.log`: Authentication attempts
- `/var/log/kern.log`: Kernel messages
- Application logs are often in subdirectories

### logrotate (Log Rotation)
```bash
logrotate /etc/logrotate.conf  # Manually run log rotation
logrotate -d /etc/logrotate.conf  # Debug mode (dry run)
```
**Purpose:** Manages log file rotation and compression.
**Explanation:**
- Prevents logs from consuming entire disk
- Configuration in `/etc/logrotate.d/`
- Typically run daily via cron

### Configuration Example: /etc/logrotate.d/myapp
```bash
/var/log/myapp/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 0644 appuser appgroup
}
```
**Explanation:**
- `daily`: Rotate daily
- `rotate 7`: Keep 7 rotated logs
- `compress`: Compress old logs
- `create`: Create new log with permissions
- `missingok`: Don't error if file missing
- `notifempty`: Don't rotate if empty

---

## 8. Disk and Storage Management

### df (Disk Free Space)
```bash
df -h                          # Show disk space in human-readable format
df -i                          # Show inode usage
df /path                       # Show space on specific mount
df -T                          # Show filesystem type
```
**Purpose:** Shows disk space usage per filesystem.
**Explanation:**
- `-h`: Human-readable (MB, GB)
- `-i`: Shows inode usage
- Available vs Used space

### du (Disk Usage)
```bash
du -h /path                    # Show size of directory and subdirectories
du -sh /path                   # Show total size of directory
du -sh *                       # Show size of all items in current directory
du -h --max-depth=1 /path      # Show size one level deep
du -h /path | sort -h          # Sort by size
```
**Purpose:** Shows disk usage of files and directories.
**Explanation:**
- `-h`: Human-readable
- `-s`: Summary (only total)
- `-k`: Kilobytes

### mount (Mount Filesystems)
```bash
mount                          # Show all mounted filesystems
mount /dev/sda1 /mnt/data      # Mount partition
mount -t nfs host:/share /mnt/nfs  # Mount NFS share
mount -o ro /dev/sda1 /mnt/data    # Mount as read-only
umount /mnt/data               # Unmount filesystem
umount -l /mnt/data            # Lazy unmount (when safe)
```
**Purpose:** Mounts and unmounts filesystems.
**Explanation:**
- Device must exist at mount point
- `/etc/fstab`: Persistent mounts

### fdisk / parted (Partition Management)
```bash
fdisk -l                       # List all partitions
fdisk /dev/sda                 # Interactive partition editor
parted /dev/sda print          # Show partition table
parted /dev/sda mkpart primary ext4 0% 100%  # Create partition
```
**Purpose:** Creates and manages disk partitions.
**Explanation:**
- `fdisk`: Traditional tool
- `parted`: Newer, more powerful tool
- Use with caution - data loss possible

### mkfs (Make Filesystem)
```bash
mkfs -t ext4 /dev/sda1         # Create ext4 filesystem
mkfs.ext4 /dev/sda1            # Alternate syntax
mkfs -t xfs /dev/sda1          # Create XFS filesystem
```
**Purpose:** Creates filesystems on partitions.
**Explanation:**
- `-t`: Filesystem type
- Data on partition is lost

### fsck (Filesystem Check)
```bash
fsck /dev/sda1                 # Check filesystem
fsck -y /dev/sda1              # Automatically fix errors
e2fsck -f /dev/sda1            # Force check on ext4
```
**Purpose:** Checks and repairs filesystems.
**Explanation:**
- Must unmount filesystem first (or run on boot)
- `-y`: Automatically answer yes to repairs
- Only run when necessary

### lvm (Logical Volume Manager)
```bash
pvdisplay                      # Show physical volumes
vgdisplay                      # Show volume groups
lvdisplay                      # Show logical volumes
pvcreate /dev/sda1             # Create physical volume
vgcreate vg_name /dev/sda1     # Create volume group
lvcreate -n lv_name -L 10G vg_name  # Create logical volume
```
**Purpose:** Manages logical volumes for flexible storage.
**Explanation:**
- Allows dynamic resizing of volumes
- Better than fixed partitions

### dd (Data Dump - Disk Cloning)
```bash
dd if=/dev/sda of=/path/backup.img  # Backup disk
dd if=/path/backup.img of=/dev/sda  # Restore disk
dd if=/dev/zero of=/dev/sda bs=1M   # Wipe disk
dd if=/dev/urandom of=/dev/sda bs=1M  # Wipe with random data
dd if=/dev/sda | ssh host "dd of=/backup.img"  # Remote backup
```
**Purpose:** Copies data at block level.
**Explanation:**
- Very powerful and very dangerous
- `if`: Input file
- `of`: Output file
- `bs`: Block size
- No confirmation - be extremely careful

### rsync (Remote Sync)
```bash
rsync -avz source/ destination/  # Sync local directories
rsync -avz -e ssh user@host:/remote/ local/  # Remote sync
rsync -avz --delete source/ destination/  # Sync and delete extra files
rsync -avz --backup destination/  # Backup before overwriting
```
**Purpose:** Synchronizes files between local and remote systems.
**Explanation:**
- `-a`: Archive mode
- `-v`: Verbose
- `-z`: Compress during transfer
- `--delete`: Remove files not in source
- Essential DevOps tool

---

## 9. System Monitoring and Performance

### uname (System Information)
```bash
uname -a                       # Show all system information
uname -s                       # Show kernel name
uname -r                       # Show kernel release
uname -m                       # Show machine hardware
uname -p                       # Show processor
```
**Purpose:** Shows system and kernel information.
**Explanation:** Basic system info command.

### uptime (System Uptime)
```bash
uptime                         # Show how long system has been up
```
**Purpose:** Shows system uptime and load average.
**Explanation:**
- Useful for knowing when system was last rebooted
- Shows load average (1, 5, 15 minute)

### free (Memory Usage)
```bash
free -h                        # Show memory usage in human-readable format
free -m                        # Show in megabytes
free -g                        # Show in gigabytes
free -s 5                      # Refresh every 5 seconds
```
**Purpose:** Shows RAM and swap usage.
**Explanation:**
- Shows total, used, free, shared memory
- `Buffers` and `Cached` are recoverable

### iostat (Input/Output Statistics)
```bash
iostat                         # Show I/O statistics
iostat -x                      # Extended I/O stats
iostat 1 5                     # Sample every 1 second, 5 times
iostat -d                      # Disk I/O only
```
**Purpose:** Shows CPU and I/O statistics.
**Explanation:**
- %user, %system, %wait, %idle: CPU metrics
- Shows disk read/write performance
- May need `sysstat` package installed

### vmstat (Virtual Memory Statistics)
```bash
vmstat                         # Show memory statistics
vmstat 2 10                    # Sample every 2 seconds, 10 times
vmstat -s                      # Show summary
vmstat -d                      # Disk statistics
```
**Purpose:** Shows virtual memory statistics.
**Explanation:**
- Shows processes, memory, paging, I/O, CPU
- `r`: Runnable processes
- `b`: Blocked processes
- `wa`: Wait for I/O

### iotop (I/O Monitoring)
```bash
iotop                          # Show I/O usage by process
iotop -o                       # Only show processes with I/O
iotop -u username              # Show for specific user
```
**Purpose:** Real-time I/O monitoring by process.
**Explanation:**
- Like `top` but for disk I/O
- Shows which processes are doing I/O
- May need to install separately

### mpstat (Multi-Processor Statistics)
```bash
mpstat                         # Show CPU statistics
mpstat -P ALL                  # Show all CPUs
mpstat 1 5                     # Sample every 1 second, 5 times
```
**Purpose:** Shows per-CPU statistics.
**Explanation:** For multi-core systems, shows each CPU separately.

### sar (System Activity Reporter)
```bash
sar                            # Show CPU usage
sar -u                         # CPU usage report
sar -r                         # Memory usage report
sar -d                         # Disk I/O report
sar -n DEV                     # Network statistics
```
**Purpose:** Collects and reports system activity.
**Explanation:**
- Comprehensive system monitoring tool
- Can show historical data
- May need `sysstat` package

---

## 10. Text Processing and Manipulation

### cut (Extract Columns)
```bash
cut -d: -f1 /etc/passwd        # Extract first field with : delimiter
cut -c1-10 file.txt            # Extract first 10 characters
cut -d, -f2,4 file.csv         # Extract 2nd and 4th CSV fields
```
**Purpose:** Extracts columns from text.
**Explanation:**
- `-d`: Delimiter
- `-f`: Field numbers
- `-c`: Character positions

### tr (Translate Characters)
```bash
tr 'a-z' 'A-Z' < file.txt      # Convert lowercase to uppercase
echo "hello" | tr -d 'l'        # Delete characters
tr -s ' ' < file.txt           # Squeeze repeated spaces
echo "hello" | tr 'aeiou' '12345'  # Replace vowels
```
**Purpose:** Translates or deletes characters.
**Explanation:**
- `-d`: Delete characters
- `-s`: Squeeze repeated characters

### expand / unexpand (Tab Conversion)
```bash
expand file.txt                # Convert tabs to spaces
expand -t 4 file.txt           # Convert tabs to 4 spaces
unexpand file.txt              # Convert spaces to tabs
```
**Purpose:** Converts between tabs and spaces.
**Explanation:** Useful for code formatting.

### paste (Merge Lines)
```bash
paste file1.txt file2.txt      # Merge files side by side
paste -d: file1.txt file2.txt  # Use colon as delimiter
```
**Purpose:** Merges lines from multiple files.
**Explanation:** Opposite of `cut`.

### rev (Reverse Lines)
```bash
rev file.txt                   # Reverse each line
echo "hello" | rev             # Output: "olleh"
```
**Purpose:** Reverses each line of text.
**Explanation:** Simple but sometimes useful.

---

## 11. Archive and Compression

### zip (Create ZIP Archive)
```bash
zip archive.zip file1.txt      # Add file to zip
zip -r archive.zip folder/     # Add folder recursively
zip -r archive.zip *.txt       # Add all .txt files
unzip archive.zip              # Extract zip
unzip -l archive.zip           # List zip contents
```
**Purpose:** Creates and extracts ZIP archives.
**Explanation:** Cross-platform compatibility.

### gzip / gunzip (Compression)
```bash
gzip file.txt                  # Compress file (creates file.txt.gz)
gunzip file.txt.gz             # Decompress file
gzip -k file.txt               # Keep original file
gzip -9 file.txt               # Maximum compression
```
**Purpose:** Compresses/decompresses individual files.
**Explanation:**
- Removes original by default
- `-k`: Keep original

### bzip2 / bunzip2 (Higher Compression)
```bash
bzip2 file.txt                 # Compress file
bunzip2 file.txt.bz2           # Decompress file
```
**Purpose:** Better compression than gzip (slower).
**Explanation:** For better compression ratio.

---

## 12. SSH and Remote Access

### ssh (Secure Shell)
```bash
ssh user@host                  # Connect to remote host
ssh -i key.pem user@host       # Connect with private key
ssh -p 2222 user@host          # Connect to different port
ssh -v user@host               # Verbose output
ssh user@host "command"        # Execute command remotely
ssh -X user@host               # X11 forwarding (GUI)
ssh -L 8080:localhost:80 user@host  # Local port forwarding
ssh -R 8080:localhost:80 user@host  # Remote port forwarding
```
**Purpose:** Secure remote shell access.
**Explanation:**
- Default port is 22
- `-i`: Specify private key file
- `-p`: Different port
- `-v`: Debug mode
- Essential DevOps tool

### ssh-keygen (Generate SSH Keys)
```bash
ssh-keygen -t rsa -b 4096      # Generate RSA key
ssh-keygen -t ed25519          # Generate EdDSA key (better)
ssh-keygen -f ~/.ssh/id_rsa -N "passphrase"  # Set passphrase
ssh-keygen -p -f ~/.ssh/id_rsa # Change key passphrase
ssh-keygen -l -f ~/.ssh/id_rsa # Show key fingerprint
```
**Purpose:** Generates SSH key pairs.
**Explanation:**
- RSA (default): Widely compatible
- Ed25519: Modern, smaller, faster
- Public key goes to `~/.ssh/authorized_keys` on server

### ssh-copy-id (Copy SSH Public Key)
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@host  # Copy public key to host
ssh-copy-id user@host          # Use default key
```
**Purpose:** Copies public key to remote server for password-less auth.
**Explanation:** Simplifies key-based authentication setup.

### scp (Secure Copy)
```bash
scp file.txt user@host:/path/  # Copy file to remote
scp user@host:/path/file.txt . # Copy file from remote
scp -r folder user@host:/path/ # Copy folder recursively
scp -P 2222 file.txt user@host:/path/  # Different port
```
**Purpose:** Securely copies files between local and remote systems.
**Explanation:**
- Uses SSH for security
- `-r`: Recursive (directories)
- `-P`: Different port (capital P)

### sftp (Secure File Transfer Protocol)
```bash
sftp user@host                 # Start SFTP session
sftp> get file.txt             # Download file
sftp> put file.txt             # Upload file
sftp> ls                       # List remote directory
sftp> lcd /local/path          # Change local directory
```
**Purpose:** Interactive secure file transfer.
**Explanation:** More interactive than `scp`.

### /etc/ssh/sshd_config (SSH Server Configuration)
```bash
# Common configurations:
Port 22
PermitRootLogin no             # Disable root login
PubkeyAuthentication yes       # Enable key-based auth
PasswordAuthentication no      # Disable password auth
AllowUsers user1 user2         # Whitelist users
AllowGroups sshusers           # Whitelist groups
```
**Purpose:** SSH server configuration.
**Explanation:**
- Must restart SSH daemon after changes: `systemctl restart sshd`
- Always test before reloading to avoid lockout

---

## 13. Firewall and Security

### ufw (Uncomplicated Firewall - Ubuntu)
```bash
ufw enable                     # Enable firewall
ufw disable                    # Disable firewall
ufw allow 22                   # Allow port 22 (SSH)
ufw allow 80/tcp               # Allow TCP port 80
ufw allow from 192.168.1.0/24  # Allow from specific IP range
ufw deny 22                    # Deny port
ufw delete allow 22            # Remove rule
ufw status                     # Show firewall status
ufw status verbose             # Detailed status
```
**Purpose:** Simple firewall management on Ubuntu.
**Explanation:**
- Higher-level interface than iptables
- Easier to use for basic rules

### selinux (Security Enhanced Linux)
```bash
getenforce                     # Show current SELinux mode
setenforce 0                   # Set to permissive (requires root)
setenforce 1                   # Set to enforcing
getsebool -a                   # Show all booleans
setsebool -P httpd_can_network_connect on  # Set permanent boolean
```
**Purpose:** MAC (Mandatory Access Control) security system.
**Explanation:**
- Enforcing: Strict security
- Permissive: Log violations but allow
- Disabled: No SELinux

### AppArmor (Ubuntu/Debian Alternative)
```bash
aa-status                      # Show AppArmor status
aa-enforce /path/to/profile    # Enforce profile
aa-complain /path/to/profile   # Complain mode (log only)
```
**Purpose:** MAC security system (Ubuntu alternative to SELinux).
**Explanation:** Simpler than SELinux.

### iptables Rules Examples
```bash
# Allow established connections
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP and HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Default policy
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
```
**Purpose:** Configure firewall security rules.
**Explanation:** Industry-standard firewall configuration.

---

## 14. Systemd and Services

### Creating a Systemd Service File
```bash
# /etc/systemd/system/myapp.service
[Unit]
Description=My Application
After=network.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/myapp
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```
**Purpose:** Define custom services managed by systemd.
**Explanation:**
- `Type`: simple (default), forking, oneshot, etc.
- `ExecStart`: Command to start service
- `Restart`: Restart policy on failure
- `User`: User to run service as

### systemctl Service Commands
```bash
systemctl daemon-reload        # Reload systemd after changing files
systemctl start myapp          # Start service
systemctl stop myapp           # Stop service
systemctl restart myapp        # Restart service
systemctl status myapp         # Show service status
systemctl enable myapp         # Start at boot
systemctl disable myapp        # Don't start at boot
systemctl is-active myapp      # Check if active
systemctl is-enabled myapp     # Check if enabled at boot
```
**Purpose:** Manage systemd services.
**Explanation:** Essential for DevOps service management.

### journalctl Service Logs
```bash
journalctl -u myapp            # Show service logs
journalctl -u myapp -f         # Follow service logs
journalctl -u myapp -n 100     # Show last 100 lines
journalctl -u myapp --since "1 hour ago"
```
**Purpose:** View service logs.
**Explanation:** Primary way to debug services.

---

## 15. Docker and Containers

### Basic Docker Commands
```bash
docker ps                      # List running containers
docker ps -a                   # List all containers
docker images                  # List images
docker run -d -p 8080:80 nginx # Run container detached
docker stop container_id       # Stop container
docker start container_id      # Start container
docker rm container_id         # Remove container
docker rmi image_name          # Remove image
docker logs container_id       # Show container logs
docker logs -f container_id    # Follow container logs
docker exec -it container_id bash  # Execute command in container
```
**Purpose:** Manage Docker containers and images.
**Explanation:**
- `-d`: Detached (background)
- `-p`: Port mapping
- `-it`: Interactive terminal
- `-v`: Volume mounting

### Dockerfile Example
```dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3
COPY app.py /app/
WORKDIR /app
CMD ["python3", "app.py"]
```
**Purpose:** Define container image.
**Explanation:**
- `FROM`: Base image
- `RUN`: Execute command during build
- `COPY`: Copy files into image
- `WORKDIR`: Set working directory
- `CMD`: Default command

### Building and Pushing Images
```bash
docker build -t myapp:1.0 .    # Build image
docker tag myapp:1.0 registry.com/myapp:1.0  # Tag image
docker push registry.com/myapp:1.0  # Push to registry
docker pull registry.com/myapp:1.0  # Pull from registry
```
**Purpose:** Build, tag, and distribute Docker images.
**Explanation:** Essential for containerized applications.

---

## 16. System Maintenance

### Update System
```bash
apt update && apt upgrade      # Update all packages (Ubuntu)
yum update                     # Update all packages (CentOS)
apt full-upgrade               # Major version upgrades
apt autoremove                 # Remove unused packages
```
**Purpose:** Keep system current with security patches.
**Explanation:** Critical for security.

### Check Disk Usage
```bash
df -h                          # Show disk usage
du -sh /*                      # Show size of top-level directories
find / -size +1G               # Find large files
```
**Purpose:** Identify disk space issues.
**Explanation:** Prevent system from running out of space.

### Cron Jobs (Scheduled Tasks)
```bash
crontab -e                     # Edit user crontab
crontab -l                     # List user crontab
*/5 * * * * /script.sh         # Run every 5 minutes
0 2 * * * /backup.sh           # Run daily at 2 AM
0 0 1 * * /monthly.sh          # Run monthly on 1st
```
**Purpose:** Schedule recurring tasks.
**Explanation:**
- Format: minute hour day month day-of-week command
- `*/5`: Every 5 minutes
- `0 0`: Midnight

### Backup Strategy
```bash
# Daily backup
tar -czf /backup/daily-$(date +%Y%m%d).tar.gz /important/data

# Incremental backup with rsync
rsync -avz --delete /data /backup/

# Database backup
mysqldump -u root -p database > backup.sql
pg_dump database > backup.sql
```
**Purpose:** Protect data from loss.
**Explanation:**
- Multiple backup copies
- Test restore regularly
- Store off-site

### System Hardening Checklist
```bash
# 1. Disable unnecessary services
systemctl disable bluetooth
systemctl disable avahi-daemon

# 2. Set strong passwords
passwd          # Change root password
# Set minimum password length
sed -i 's/^PASS_MIN_LEN.*/PASS_MIN_LEN   12/' /etc/login.defs

# 3. Configure SSH securely
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no, PubkeyAuthentication yes, PasswordAuthentication no

# 4. Enable firewall
ufw enable

# 5. Keep system updated
apt update && apt upgrade

# 6. Install fail2ban (brute-force protection)
apt install fail2ban
systemctl enable fail2ban
```
**Purpose:** Secure Linux system against common attacks.
**Explanation:** Essential for production systems.

---

## Summary Table of Essential DevOps Commands

| Category | Command | Purpose |
|----------|---------|---------|
| **Navigation** | pwd, ls, cd, mkdir | Basic filesystem operations |
| **File Operations** | cp, mv, rm, cat | File manipulation |
| **Searching** | find, grep, locate | Search files and content |
| **Text Processing** | sed, awk, cut, tr | Process and transform text |
| **Users** | useradd, usermod, passwd, sudo | User management |
| **Permissions** | chmod, chown, chgrp | Access control |
| **Processes** | ps, top, kill, systemctl | Process management |
| **Networking** | ping, ifconfig, netstat, curl, ssh | Network operations |
| **Packages** | apt, yum, pip, npm | Package management |
| **Monitoring** | top, free, df, iostat, vmstat | System monitoring |
| **Logs** | journalctl, tail, grep, less | Log examination |
| **Storage** | mount, umount, lvm, dd, rsync | Storage management |
| **Security** | iptables, ufw, selinux, ssh-keygen | Security configuration |
| **Services** | systemctl, journalctl, daemon-reload | Service management |
| **Containers** | docker | Container management |

---

## Tips for DevOps Engineers

1. **Automate Everything**: Write scripts for repetitive tasks
2. **Master SSH and Bash**: These are your primary tools
3. **Understand Permissions**: Critical for security and functionality
4. **Monitor Logs**: Most issues leave traces in logs
5. **Use Version Control**: Track all configuration changes
6. **Test in Staging**: Always test before production
7. **Document Runbooks**: Create procedures for common tasks
8. **Set Alerts**: Don't rely on manual monitoring
9. **Plan for Disasters**: Regular backup and recovery testing
10. **Stay Current**: Keep systems and knowledge up to date

---

## Keyboard Shortcuts in Linux Terminal

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Go to beginning of line |
| `Ctrl+E` | Go to end of line |
| `Ctrl+U` | Clear from cursor to beginning |
| `Ctrl+K` | Clear from cursor to end |
| `Ctrl+R` | Reverse search history |
| `Ctrl+Z` | Suspend current process |
| `Ctrl+C` | Interrupt/kill process |
| `Ctrl+D` | Exit shell |
| `Tab` | Auto-complete |
| `!!` | Last command |
| `!$` | Last argument |

---

## Resources for Further Learning

- **Man Pages**: `man command_name`
- **Linux Academy**: Online courses
- **TechExams**: Practice exams
- **Stack Overflow**: Community Q&A
- **GitHub**: Real-world examples
- **Linux Foundation**: Official training

---

**Last Updated**: 2024
**Version**: 1.0
**Difficulty**: Beginner to Advanced
