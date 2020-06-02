class Team < ApplicationRecord
    has_many :characters
    validates :name, presence: true

    def name=(s)
        write_attribute(:name, s.to_s.titleize)
    end
end
