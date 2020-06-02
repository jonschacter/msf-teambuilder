class Character < ApplicationRecord
  belongs_to :team
  validates :name, presence: true
  validates :power, presence: true
  validates :power, numericality: {greater_than: 0}

  def name=(s)
    write_attribute(:name, s.to_s.titleize)
  end
end
