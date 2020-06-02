class Character < ApplicationRecord
  belongs_to :team
  validates :name, presence: true

  def name=(s)
    write_attribute(:name, s.to_s.titleize)
  end
end
