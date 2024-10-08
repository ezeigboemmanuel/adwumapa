// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Adwumapa is ReentrancyGuard {

    struct Milestone {
        uint256 id;
        uint256 amount;
        string description;
        bool isCompleted;
    }

    struct Project {
        uint256 amount;
        string title;
        string description;
        Milestone[] milestones;
        uint256 startDate;
        uint256 endDate;
        string revisionPolicy;
    }

    mapping(address => Project) public projects; // Mapping to store projects by client address

    event PaymentProcessed(address indexed recipient, uint256 amount);
    event Deposit(address indexed sender, uint256 amount);
    event PaymentReleased(address indexed client, address indexed freelancer, uint256 amount);
    event ProjectCompleted(address indexed client, address indexed freelancer, uint256 amount);
    event MilestoneCompleted(address indexed client, address indexed freelancer, uint256 milestoneIndex, uint256 amount);
    event ProjectCreated(address indexed client, uint256 amount, string title, string description, Milestone[] milestones, uint256 startDate, uint256 endDate, string revisionPolicy);
    event MilestoneCreated(address indexed client, uint256 milestoneId, uint256 amount, string description);

    mapping(address => uint256) public clientBalances;
    mapping(address => address) public clientFreelancer;
    mapping(address => uint256[]) public clientMilestones;

    // Function to deposit Ether into the contract
    function deposit(address freelancer) external payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than 0");
        require(freelancer != address(0), "Invalid freelancer address");
        clientBalances[msg.sender] += msg.value;
        clientFreelancer[msg.sender] = freelancer;
        emit Deposit(msg.sender, msg.value);
    }

    // Function to mark project as complete and release payment
    function completeProject() external nonReentrant {
        address freelancer = clientFreelancer[msg.sender];
        uint256 amount = clientBalances[msg.sender];

        require(freelancer != address(0), "No freelancer assigned");
        require(amount > 0, "No funds to release");

        clientBalances[msg.sender] = 0;
        clientFreelancer[msg.sender] = address(0);
        payable(freelancer).transfer(amount);
        emit ProjectCompleted(msg.sender, freelancer, amount);
        emit PaymentReleased(msg.sender, freelancer, amount);
    }

    // Function to release payment when client is satisfied
    function releasePayment(address freelancer, uint256 amount) external nonReentrant {
        require(freelancer != address(0), "Invalid freelancer address");
        require(amount > 0, "Amount must be greater than 0");
        require(clientBalances[msg.sender] >= amount, "Insufficient balance");

        clientBalances[msg.sender] -= amount;
        payable(freelancer).transfer(amount);
        emit PaymentReleased(msg.sender, freelancer, amount);
    }

    function createProject(
        uint256 amount,
        string memory title,
        string memory description,
        uint256 startDate,
        uint256 endDate,
        string memory revisionPolicy
    ) external payable nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        
        Project storage newProject = projects[msg.sender]; // Create a new project for the client
        newProject.amount = amount;
        newProject.title = title;
        newProject.description = description;
        newProject.startDate = startDate;
        newProject.endDate = endDate;
        newProject.revisionPolicy = revisionPolicy;

        clientBalances[msg.sender] += msg.value;
        emit ProjectCreated(msg.sender, amount, title, description, newProject.milestones, startDate, endDate, revisionPolicy);
    }

    // Function to create a milestone for an existing project
    function createMilestone(uint256 amount, string memory description) external {
        require(amount > 0, "Amount must be greater than 0");
        require(projects[msg.sender].amount > 0, "No project found for this client"); // Ensure a project exists

        Project storage project = projects[msg.sender];

        // Check that the total milestone amounts do not exceed the project amount
        uint256 totalMilestoneAmount = 0;
        for (uint256 i = 0; i < project.milestones.length; i++) {
            totalMilestoneAmount += project.milestones[i].amount;
        }
        require(totalMilestoneAmount + amount <= project.amount, "Total milestone amounts exceed project amount");

        // Assign a new milestone ID based on the current length of the milestones array
        uint256 newMilestoneId = project.milestones.length;

        Milestone memory newMilestone = Milestone({
            id: newMilestoneId,
            amount: amount,
            description: description,
            isCompleted: false
        });

        project.milestones.push(newMilestone); 
        emit MilestoneCreated(msg.sender, newMilestone.id, amount, description);
    }

    // Function to mark milestone as complete and release payment
    function completeMilestone(uint256 milestoneIndex) external nonReentrant {
        address freelancer = clientFreelancer[msg.sender];
        Project storage project = projects[msg.sender];

        require(milestoneIndex < project.milestones.length, "Invalid milestone index");

        Milestone storage milestone = project.milestones[milestoneIndex];
        require(!milestone.isCompleted, "Milestone already completed");
        require(clientBalances[msg.sender] >= milestone.amount, "Insufficient balance");

        milestone.isCompleted = true;
        clientBalances[msg.sender] -= milestone.amount;
        payable(freelancer).transfer(milestone.amount);
        emit MilestoneCompleted(msg.sender, freelancer, milestoneIndex, milestone.amount);
    }

    // Function to check and release funds for completed milestones
    function completeMilestones() external nonReentrant {
        address freelancer = clientFreelancer[msg.sender];
        Project storage project = projects[msg.sender];

        require(freelancer != address(0), "No freelancer assigned");
        require(project.amount > 0, "No project found for this client");

        uint256 totalReleased = 0;

        for (uint256 i = 0; i < project.milestones.length; i++) {
            Milestone storage milestone = project.milestones[i];
            if (milestone.isCompleted && clientBalances[msg.sender] >= milestone.amount) {
                clientBalances[msg.sender] -= milestone.amount;
                totalReleased += milestone.amount;
                emit MilestoneCompleted(msg.sender, freelancer, i, milestone.amount);
            }
        }

        require(totalReleased > 0, "No funds to release");
        payable(freelancer).transfer(totalReleased);
        emit PaymentReleased(msg.sender, freelancer, totalReleased);
    }
}