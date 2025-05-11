const { MigrationInterface, QueryRunner } = require('typeorm');

export default class InitMigration1746445157365 {
  async up(queryRunner) {
        // Create systemUsers table
        await queryRunner.query(`
            CREATE TABLE systemUsers (
                id INT PRIMARY KEY IDENTITY,
                fullName NVARCHAR(255) NOT NULL,
                email NVARCHAR(255) UNIQUE NOT NULL,
                password NVARCHAR(255) NOT NULL,
                role NVARCHAR(100),
                isActive BIT DEFAULT 1,
                createdAt DATETIME DEFAULT GETDATE()
            )
        `);

        // Create all other tables
        await queryRunner.query(`
            CREATE TABLE addresses (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                customerId INT NOT NULL,
                gisLocation NVARCHAR(MAX),
                storeId INT NOT NULL,
                street NVARCHAR(255) NOT NULL,
                city NVARCHAR(255) NOT NULL,
                zipCode NVARCHAR(50) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE customers (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                name NVARCHAR(255) NOT NULL,
                paymentMethods NVARCHAR(MAX) NOT NULL,
                phoneNumber NVARCHAR(50) NOT NULL,
                regionId INT
            )
        `);

        await queryRunner.query(`
            CREATE TABLE customerComplaints (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                customerId INT NOT NULL,
                content NVARCHAR(MAX) NOT NULL,
                resolved BIT DEFAULT 0
            )
        `);

        await queryRunner.query(`
            CREATE TABLE itemGroups (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                groupArName NVARCHAR(255) NOT NULL,
                groupCode NVARCHAR(50) NOT NULL,
                groupEngName NVARCHAR(255) NOT NULL,
                parentGroupId INT,
                vatPercentage DECIMAL(5, 2) DEFAULT 0
            )
        `);

        await queryRunner.query(`
            CREATE TABLE items (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                groupId INT NOT NULL,
                itemArName NVARCHAR(255) NOT NULL,
                itemCode NVARCHAR(50) NOT NULL,
                itemEngName NVARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                uom NVARCHAR(50) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE orders (
                id NVARCHAR(255) PRIMARY KEY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                updatedAt DATETIME2 DEFAULT GETDATE(),
                addressId INT NOT NULL,
                customerId INT NOT NULL,
                customerName NVARCHAR(255) NOT NULL,
                customerPhone NVARCHAR(50) NOT NULL,
                deliveryAddress NVARCHAR(MAX) NOT NULL,
                deliveryFee DECIMAL(10, 2),
                paymentMethod NVARCHAR(50) NOT NULL,
                status NVARCHAR(50) NOT NULL,
                storeId INT NOT NULL,
                storeName NVARCHAR(255) NOT NULL,
                totalAmount DECIMAL(10, 2) NOT NULL,
                vatAmount DECIMAL(10, 2)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE orderItems (
                id NVARCHAR(255) PRIMARY KEY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                orderId NVARCHAR(255) NOT NULL,
                notes NVARCHAR(MAX),
                price DECIMAL(10, 2) NOT NULL,
                productId INT NOT NULL,
                productName NVARCHAR(255) NOT NULL,
                quantity DECIMAL(10, 2) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE productCategories (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                icon NVARCHAR(255) NOT NULL,
                name NVARCHAR(255) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE products (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                categoryId INT NOT NULL,
                description NVARCHAR(MAX) NOT NULL,
                image NVARCHAR(255),
                name NVARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE regionSetup (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                deliveryValue DECIMAL(10, 2) DEFAULT 0,
                regionArName NVARCHAR(255) NOT NULL,
                regionCode NVARCHAR(50) NOT NULL,
                regionEngName NVARCHAR(255) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE stores (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                address NVARCHAR(MAX) NOT NULL,
                name NVARCHAR(255) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE storeSetup (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                storeArName NVARCHAR(255) NOT NULL,
                storeCode NVARCHAR(50) NOT NULL,
                storeEngName NVARCHAR(255) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE storeRegionLinks (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                isActive BIT,
                regionId INT NOT NULL,
                storeId INT NOT NULL,
                CONSTRAINT UQ_store_region_links UNIQUE (regionId, storeId)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE userPermissions (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                userId INT NOT NULL,
                allowItemGroupsSetup BIT DEFAULT 0,
                allowNewCustomer BIT DEFAULT 0,
                allowRegionSetup BIT DEFAULT 0,
                allowStoreSetup BIT DEFAULT 0,
                allowUserSetup BIT DEFAULT 0,
                CONSTRAINT UQ_user_permissions_user UNIQUE (userId)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE vehicleRecords (
                id INT PRIMARY KEY IDENTITY,
                createdAt DATETIME2 DEFAULT GETDATE(),
                entryTime DATETIME2 NOT NULL,
                exitTime DATETIME2,
                licensePlate NVARCHAR(50) NOT NULL,
                notes NVARCHAR(MAX),
                ownerName NVARCHAR(255) NOT NULL
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX IX_customers_regionId ON customers (regionId)`);
        await queryRunner.query(`CREATE INDEX IX_order_items_orderId ON orderItems (orderId)`);
        await queryRunner.query(`CREATE INDEX IX_products_categoryId ON products (categoryId)`);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE customerComplaints ADD CONSTRAINT FK_complaints_customer 
            FOREIGN KEY (customerId) REFERENCES customers(id)
        `);

        await queryRunner.query(`
            ALTER TABLE customers ADD CONSTRAINT FK_customers_region 
            FOREIGN KEY (regionId) REFERENCES regionSetup(id)
        `);

        await queryRunner.query(`
            ALTER TABLE itemGroups ADD CONSTRAINT FK_item_groups_parent 
            FOREIGN KEY (parentGroupId) REFERENCES itemGroups(id)
        `);

        await queryRunner.query(`
            ALTER TABLE items ADD CONSTRAINT FK_items_group 
            FOREIGN KEY (groupId) REFERENCES itemGroups(id)
        `);

        await queryRunner.query(`
            ALTER TABLE orderItems ADD CONSTRAINT FK_order_items_order 
            FOREIGN KEY (orderId) REFERENCES orders(id)
        `);

        await queryRunner.query(`
            ALTER TABLE products ADD CONSTRAINT FK_products_category 
            FOREIGN KEY (categoryId) REFERENCES productCategories(id)
        `);

        await queryRunner.query(`
            ALTER TABLE userPermissions ADD CONSTRAINT FK_user_permissions_user 
            FOREIGN KEY (userId) REFERENCES systemUsers(id)
        `);

        // Add check constraints
        await queryRunner.query(`
            ALTER TABLE customers ADD CONSTRAINT CHK_customers_paymentMethods 
            CHECK (ISJSON(paymentMethods) = 1
        `);
    }

    async down(queryRunner) {
        // Drop all tables in reverse order of creation to respect foreign key constraints
        await queryRunner.query(`DROP TABLE IF EXISTS vehicleRecords`);
        await queryRunner.query(`DROP TABLE IF EXISTS userPermissions`);
        await queryRunner.query(`DROP TABLE IF EXISTS storeRegionLinks`);
        await queryRunner.query(`DROP TABLE IF EXISTS storeSetup`);
        await queryRunner.query(`DROP TABLE IF EXISTS stores`);
        await queryRunner.query(`DROP TABLE IF EXISTS regionSetup`);
        await queryRunner.query(`DROP TABLE IF EXISTS products`);
        await queryRunner.query(`DROP TABLE IF EXISTS productCategories`);
        await queryRunner.query(`DROP TABLE IF EXISTS orderItems`);
        await queryRunner.query(`DROP TABLE IF EXISTS orders`);
        await queryRunner.query(`DROP TABLE IF EXISTS items`);
        await queryRunner.query(`DROP TABLE IF EXISTS itemGroups`);
        await queryRunner.query(`DROP TABLE IF EXISTS customerComplaints`);
        await queryRunner.query(`DROP TABLE IF EXISTS customers`);
        await queryRunner.query(`DROP TABLE IF EXISTS addresses`);
        await queryRunner.query(`DROP TABLE IF EXISTS systemUsers`);
    }
}

module.exports = InitMigration;