-- High-level database schema for the DigitalView Dynamic Proposal Tool

-- Users table for agency staff
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL, -- e.g., 'Admin', 'Sales'
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tools table
CREATE TABLE Tools (
    ToolID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    MonthlyCost DECIMAL(10, 2) NOT NULL,
    UsageLimit INT,
    UsageUnit VARCHAR(50) -- e.g., 'projects', 'channels', 'queries'
);

-- Services table
CREATE TABLE Services (
    ServiceID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    BaseCost DECIMAL(10, 2) NOT NULL, -- Internal cost before markup
    ClientPrice DECIMAL(10, 2) NOT NULL, -- Price after markup
    EstimatedHoursYou DECIMAL(5, 2),
    EstimatedHoursStaff DECIMAL(5, 2)
);

-- Service_Tools table (many-to-many relationship between Services and Tools)
CREATE TABLE Service_Tools (
    ServiceID INT,
    ToolID INT,
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID),
    FOREIGN KEY (ToolID) REFERENCES Tools(ToolID),
    PRIMARY KEY (ServiceID, ToolID)
);

-- Proposals table
CREATE TABLE Proposals (
    ProposalID INT PRIMARY KEY AUTO_INCREMENT,
    ClientID INT, -- Will link to a Clients table
    Status VARCHAR(50) NOT NULL, -- e.g., 'Draft', 'Sent', 'Signed', 'Archived'
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    SignedAt TIMESTAMP,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID)
);

-- Proposal_Services table (details of services included in a proposal)
CREATE TABLE Proposal_Services (
    ProposalServiceID INT PRIMARY KEY AUTO_INCREMENT,
    ProposalID INT,
    ServiceID INT,
    Quantity INT,
    CustomPrice DECIMAL(10, 2), -- If there's a custom price for a service in a proposal
    FOREIGN KEY (ProposalID) REFERENCES Proposals(ProposalID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID)
);

-- Clients table
CREATE TABLE Clients (
    ClientID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
