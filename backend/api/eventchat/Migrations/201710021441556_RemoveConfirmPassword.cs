namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveConfirmPassword : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.User", "ConfirmPassword");
            DropColumn("dbo.User", "Discriminator");
            DropColumn("dbo.User", "Wofufu");
        }
        
        public override void Down()
        {
            AddColumn("dbo.User", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.User", "ConfirmPassword", c => c.String());
            AddColumn("dbo.User", "Wofufu", c => c.String());
        }
    }
}
