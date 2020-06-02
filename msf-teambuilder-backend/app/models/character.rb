class Character < ApplicationRecord
    include ActiveSupport::NumberHelper

  belongs_to :team
  validates :name, presence: true
  validates :power, presence: true
  validates :power, numericality: {greater_than: 0}

  def name=(s)
    write_attribute(:name, s.to_s.titleize)
  end

  def power
    number_to_delimited(self[:power])
  end
end
