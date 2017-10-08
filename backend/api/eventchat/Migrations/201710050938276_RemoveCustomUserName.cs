namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveCustomUserName : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.User", new[] { "UserName" });
            CreateTable(
                "dbo.IdentityUserClaim",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                        User_UserID = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_UserID)
                .Index(t => t.User_UserID);
            
            CreateTable(
                "dbo.IdentityUserLogin",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        LoginProvider = c.String(),
                        ProviderKey = c.String(),
                        User_UserID = c.Int(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.User", t => t.User_UserID)
                .Index(t => t.User_UserID);
            
            CreateTable(
                "dbo.IdentityUserRole",
                c => new
                    {
                        RoleId = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                        User_UserID = c.Int(),
                        IdentityRole_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.RoleId, t.UserId })
                .ForeignKey("dbo.User", t => t.User_UserID)
                .ForeignKey("dbo.IdentityRole", t => t.IdentityRole_Id)
                .Index(t => t.User_UserID)
                .Index(t => t.IdentityRole_Id);
            
            CreateTable(
                "dbo.IdentityRole",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.User", "Email", c => c.String());
            AddColumn("dbo.User", "EmailConfirmed", c => c.Boolean(nullable: false));
            AddColumn("dbo.User", "PasswordHash", c => c.String());
            AddColumn("dbo.User", "SecurityStamp", c => c.String());
            AddColumn("dbo.User", "PhoneNumber", c => c.String());
            AddColumn("dbo.User", "PhoneNumberConfirmed", c => c.Boolean(nullable: false));
            AddColumn("dbo.User", "TwoFactorEnabled", c => c.Boolean(nullable: false));
            AddColumn("dbo.User", "LockoutEndDateUtc", c => c.DateTime());
            AddColumn("dbo.User", "LockoutEnabled", c => c.Boolean(nullable: false));
            AddColumn("dbo.User", "AccessFailedCount", c => c.Int(nullable: false));
            AddColumn("dbo.User", "Id", c => c.String());
            AlterColumn("dbo.User", "UserName", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.IdentityUserRole", "IdentityRole_Id", "dbo.IdentityRole");
            DropForeignKey("dbo.IdentityUserRole", "User_UserID", "dbo.User");
            DropForeignKey("dbo.IdentityUserLogin", "User_UserID", "dbo.User");
            DropForeignKey("dbo.IdentityUserClaim", "User_UserID", "dbo.User");
            DropIndex("dbo.IdentityUserRole", new[] { "IdentityRole_Id" });
            DropIndex("dbo.IdentityUserRole", new[] { "User_UserID" });
            DropIndex("dbo.IdentityUserLogin", new[] { "User_UserID" });
            DropIndex("dbo.IdentityUserClaim", new[] { "User_UserID" });
            AlterColumn("dbo.User", "UserName", c => c.String(nullable: false, maxLength: 450));
            DropColumn("dbo.User", "Id");
            DropColumn("dbo.User", "AccessFailedCount");
            DropColumn("dbo.User", "LockoutEnabled");
            DropColumn("dbo.User", "LockoutEndDateUtc");
            DropColumn("dbo.User", "TwoFactorEnabled");
            DropColumn("dbo.User", "PhoneNumberConfirmed");
            DropColumn("dbo.User", "PhoneNumber");
            DropColumn("dbo.User", "SecurityStamp");
            DropColumn("dbo.User", "PasswordHash");
            DropColumn("dbo.User", "EmailConfirmed");
            DropColumn("dbo.User", "Email");
            DropTable("dbo.IdentityRole");
            DropTable("dbo.IdentityUserRole");
            DropTable("dbo.IdentityUserLogin");
            DropTable("dbo.IdentityUserClaim");
            CreateIndex("dbo.User", "UserName", unique: true);
        }
    }
}
