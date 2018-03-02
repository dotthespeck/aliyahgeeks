class Post < ApplicationRecord
  belongs_to :user

  has_attached_file :image, styles: { med: "100x100", large: "200x200" }, :path =>"app/assets/images/post_pictures/:filename", :url => "/assets/post_pictures/:filename"
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  def post_pic_url
    image.url(:original)
  end

  def author_info
    @author = User.find_by(id: self.user_id)
  end
end
