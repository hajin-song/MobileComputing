namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateEntityRelations : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Comment", "image_ImageID", "dbo.Image");
            DropIndex("dbo.Comment", new[] { "image_ImageID" });
            CreateTable(
                "dbo.EventType",
                c => new
                    {
                        EventTypeID = c.Int(nullable: false, identity: true),
                        Type = c.String(nullable: false),
                        Level = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EventTypeID);
            
            AddColumn("dbo.Comment", "Content", c => c.String(nullable: false));
            AddColumn("dbo.Comment", "Longitude", c => c.Double(nullable: false));
            AddColumn("dbo.Comment", "Latitude", c => c.Double(nullable: false));
            AddColumn("dbo.Comment", "UserID", c => c.Int());
            AddColumn("dbo.Comment", "EventID", c => c.Int());
            AddColumn("dbo.Image", "Comment_CommentID", c => c.Int());
            AddColumn("dbo.Event", "Detail", c => c.String(nullable: false));
            AddColumn("dbo.Event", "type_EventTypeID", c => c.Int());
            AddColumn("dbo.User", "DateOfBirth", c => c.DateTime(nullable: false));
            AddColumn("dbo.User", "Authority", c => c.Boolean(nullable: false));
            AddColumn("dbo.User", "Address", c => c.String(nullable: false, unicode: false));
            AlterColumn("dbo.Image", "imageURL", c => c.String(nullable: false));
            AlterColumn("dbo.Event", "Name", c => c.String(nullable: false, maxLength: 100));
            CreateIndex("dbo.Comment", "UserID");
            CreateIndex("dbo.Comment", "EventID");
            CreateIndex("dbo.Event", "type_EventTypeID");
            CreateIndex("dbo.Image", "Comment_CommentID");
            AddForeignKey("dbo.Comment", "EventID", "dbo.Event", "EventID");
            AddForeignKey("dbo.Event", "type_EventTypeID", "dbo.EventType", "EventTypeID");
            AddForeignKey("dbo.Image", "Comment_CommentID", "dbo.Comment", "CommentID");
            AddForeignKey("dbo.Comment", "UserID", "dbo.User", "UserID");
            DropColumn("dbo.Comment", "comment");
            DropColumn("dbo.Comment", "image_ImageID");
            DropColumn("dbo.Event", "type");
            DropColumn("dbo.Event", "details");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Event", "details", c => c.String());
            AddColumn("dbo.Event", "type", c => c.Int());
            AddColumn("dbo.Comment", "image_ImageID", c => c.Int());
            AddColumn("dbo.Comment", "comment", c => c.String());
            DropForeignKey("dbo.Comment", "UserID", "dbo.User");
            DropForeignKey("dbo.Image", "Comment_CommentID", "dbo.Comment");
            DropForeignKey("dbo.Event", "type_EventTypeID", "dbo.EventType");
            DropForeignKey("dbo.Comment", "EventID", "dbo.Event");
            DropIndex("dbo.Image", new[] { "Comment_CommentID" });
            DropIndex("dbo.Event", new[] { "type_EventTypeID" });
            DropIndex("dbo.Comment", new[] { "EventID" });
            DropIndex("dbo.Comment", new[] { "UserID" });
            AlterColumn("dbo.Event", "Name", c => c.String());
            AlterColumn("dbo.Image", "imageURL", c => c.String());
            DropColumn("dbo.User", "Address");
            DropColumn("dbo.User", "Authority");
            DropColumn("dbo.User", "DateOfBirth");
            DropColumn("dbo.Event", "type_EventTypeID");
            DropColumn("dbo.Event", "Detail");
            DropColumn("dbo.Image", "Comment_CommentID");
            DropColumn("dbo.Comment", "EventID");
            DropColumn("dbo.Comment", "UserID");
            DropColumn("dbo.Comment", "Latitude");
            DropColumn("dbo.Comment", "Longitude");
            DropColumn("dbo.Comment", "Content");
            DropTable("dbo.EventType");
            CreateIndex("dbo.Comment", "image_ImageID");
            AddForeignKey("dbo.Comment", "image_ImageID", "dbo.Image", "ImageID");
        }
    }
}
